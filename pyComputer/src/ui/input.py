"""
input.py: Keyboard events, keybindings, input handling.
"""

import sys
import os
import ctypes
import ctypes.util
from typing import Callable, Optional
from src.utils.platform import is_web

web_input_queue: list = []

if sys.platform != "win32" and not is_web():
    _libc_name = ctypes.util.find_library("c")
    _libc = ctypes.CDLL(_libc_name, use_errno=True)

    NCCS = 32
    TCSANOW = 0
    TCSADRAIN = 1
    ICANON = 0o000002
    ECHO = 0o000010
    VMIN = 6
    VTIME = 5

    class Termios(ctypes.Structure):
        _fields_ = [
            ("c_iflag", ctypes.c_uint32),
            ("c_oflag", ctypes.c_uint32),
            ("c_cflag", ctypes.c_uint32),
            ("c_lflag", ctypes.c_uint32),
            ("c_line", ctypes.c_uint8),
            ("c_cc", ctypes.c_uint8 * NCCS),
            ("c_ispeed", ctypes.c_uint32),
            ("c_ospeed", ctypes.c_uint32),
        ]

    _libc.tcgetattr.argtypes = [ctypes.c_int, ctypes.POINTER(Termios)]
    _libc.tcgetattr.restype = ctypes.c_int
    _libc.tcsetattr.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.POINTER(Termios)]
    _libc.tcsetattr.restype = ctypes.c_int

    def _tcgetattr(fd: int) -> Termios:
        t = Termios()
        if _libc.tcgetattr(fd, ctypes.byref(t)) != 0:
            raise OSError(ctypes.get_errno(), "tcgetattr failed")
        return t

    def _tcsetattr(fd: int, when: int, t: Termios):
        if _libc.tcsetattr(fd, when, ctypes.byref(t)) != 0:
            raise OSError(ctypes.get_errno(), "tcsetattr failed")

    def _setraw(fd: int, old: Termios) -> None:
        raw = Termios()
        ctypes.memmove(
            ctypes.addressof(raw), ctypes.addressof(old), ctypes.sizeof(Termios)
        )
        raw.c_lflag &= ~(ICANON | ECHO)
        raw.c_cc[VMIN] = 1
        raw.c_cc[VTIME] = 0
        _tcsetattr(fd, TCSANOW, raw)


class Key:
    UP = "\x1b[A"
    DOWN = "\x1b[B"
    RIGHT = "\x1b[C"
    LEFT = "\x1b[D"
    ENTER = "\r"
    ESCAPE = "\x1b"
    TAB = "\t"
    BACKSPACE = "\x7f"
    DELETE = "\x1b[3~"
    HOME = "\x1b[H"
    END = "\x1b[F"
    PAGE_UP = "\x1b[5~"
    PAGE_DOWN = "\x1b[6~"
    F1 = "\x1bOP"
    F2 = "\x1bOQ"
    F3 = "\x1bOR"
    F4 = "\x1bOS"


def get_key() -> Optional[str]:
    if is_web():
        if web_input_queue:
            return web_input_queue.pop(0)
        return None

    if sys.platform == "win32":
        try:
            import msvcrt

            if msvcrt.kbhit():
                ch = msvcrt.getch()
                if ch == b"\xe0":
                    return msvcrt.getch()
                return ch.decode("utf-8", errors="replace")
        except:
            pass
        return None

    try:
        fd = sys.stdin.fileno()
        # Non-blocking read: if no byte is ready, return None immediately
        import fcntl

        flags = fcntl.fcntl(fd, fcntl.F_GETFL)
        fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)
        try:
            ch = os.read(fd, 1).decode("utf-8", errors="replace")
        except BlockingIOError:
            return None
        finally:
            fcntl.fcntl(fd, fcntl.F_SETFL, flags)
        if ch == "\x1b":
            try:
                fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)
                nxt = os.read(fd, 1).decode("utf-8", errors="replace")
                if nxt == "[":
                    seq = os.read(fd, 1).decode("utf-8", errors="replace")
                    return ch + "[" + seq
                return ch + nxt
            except BlockingIOError:
                return ch
            finally:
                fcntl.fcntl(fd, fcntl.F_SETFL, flags)
        return ch
    except:
        return None


def read_line(
    prompt: str = "",
    history: Optional[list] = None,
    completer: Optional[Callable] = None,
) -> str:
    if history is None:
        history = []
    line = ""
    pos = 0
    hist_idx = -1

    sys.stdout.write(prompt)
    sys.stdout.flush()

    while True:
        key = get_key()
        if key is None:
            continue

        if key == Key.ENTER:
            sys.stdout.write("\n")
            sys.stdout.flush()
            if line:
                history.append(line)
            return line

        elif key == Key.ESCAPE:
            return ""

        elif key == Key.BACKSPACE:
            if pos > 0:
                line = line[: pos - 1] + line[pos:]
                pos -= 1

        elif key == Key.UP:
            if history and hist_idx < len(history) - 1:
                hist_idx += 1
                line = history[-1 - hist_idx]
                pos = len(line)

        elif key == Key.DOWN:
            if hist_idx > 0:
                hist_idx -= 1
                line = history[-1 - hist_idx]
                pos = len(line)
            elif hist_idx == 0:
                hist_idx = -1
                line = ""
                pos = 0

        else:
            line = line[:pos] + key + line[pos:]
            pos += 1


class KeyBinding:
    def __init__(self, key: str, handler: Callable):
        self.key = key
        self.handler = handler


class KeyMap:
    def __init__(self):
        self.bindings: list[KeyBinding] = []

    def bind(self, key: str):
        def decorator(fn: Callable):
            self.bindings.append(KeyBinding(key, fn))
            return fn

        return decorator

    def handle(self, key: str) -> bool:
        for binding in self.bindings:
            if key == binding.key:
                binding.handler()
                return True
        return False


def keybind(keys: dict[str, Callable]) -> KeyMap:
    km = KeyMap()
    for key, handler in keys.items():
        km.bindings.append(KeyBinding(key, handler))
    return km


def setup_raw():
    if is_web():
        try:
            import js

            js.setRawInput(True)
        except Exception:
            pass
        return None
    if sys.platform == "win32":
        return None
    fd = sys.stdin.fileno()
    old = _tcgetattr(fd)
    _setraw(fd, old)
    return old


def restore(settings):
    if is_web():
        try:
            import js

            js.setRawInput(False)
        except Exception:
            pass
        return
    if settings is None:
        return
    if sys.platform == "win32":
        return
    fd = sys.stdin.fileno()
    _tcsetattr(fd, TCSADRAIN, settings)


def cleanup():
    sys.stdout.write("\033[2J\033[H\033[?25h\r\n")
    sys.stdout.flush()
