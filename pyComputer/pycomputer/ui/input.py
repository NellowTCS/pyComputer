"""
input.py: Keyboard events, keybindings, input handling.
"""

import sys
import os
from typing import Callable, Optional
from pycomputer.utils.platform import is_web

_HAS_TERMIOS = False
if not is_web() and sys.platform != "win32":
    try:
        import termios
        import tty
        _HAS_TERMIOS = True
    except ImportError:
        pass

web_input_queue: list = []


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
            # Start of an escape sequence
            seq = ch
            # Set to non-blocking to read the rest of the sequence
            fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)
            try:
                # Read first char after ESC
                nxt = os.read(fd, 1).decode("utf-8", errors="replace")
                seq += nxt
                if nxt == "[":
                    # CSI sequence - read until terminator (alpha or ~)
                    while True:
                        try:
                            c = os.read(fd, 1).decode("utf-8", errors="replace")
                            seq += c
                            if c.isalpha() or c in ("~",):
                                break
                        except BlockingIOError:
                            break
                elif nxt == "O":
                    # SS3 sequence - usually 1 more char
                    try:
                        seq += os.read(fd, 1).decode("utf-8", errors="replace")
                    except BlockingIOError:
                        pass
            except BlockingIOError:
                pass
            finally:
                fcntl.fcntl(fd, fcntl.F_SETFL, flags)
            return seq
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
    if sys.platform == "win32" or not _HAS_TERMIOS:
        return None
    fd = sys.stdin.fileno()
    if not os.isatty(fd):
        return None
    try:
        old = termios.tcgetattr(fd)
        tty.setraw(fd)
        return old
    except (termios.error, OSError):
        return None


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
    if sys.platform == "win32" or not _HAS_TERMIOS:
        return None
    fd = sys.stdin.fileno()
    if not os.isatty(fd):
        return
    try:
        termios.tcsetattr(fd, termios.TCSADRAIN, settings)
    except (termios.error, OSError):
        pass


def cleanup():
    sys.stdout.write("\033[2J\033[H\033[?25h\r\n")
    sys.stdout.flush()
