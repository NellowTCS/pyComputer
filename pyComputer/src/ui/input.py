"""
input.py: Keyboard events, keybindings, input handling.
"""

import sys
import tty
import termios
from typing import Callable, Optional


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
        old = termios.tcgetattr(fd)
        tty.setraw(fd)
        try:
            ch = sys.stdin.read(1)
            if ch == "\x1b":
                if sys.stdin.read(1) == "[":
                    return ch + "[" + sys.stdin.read(1)
            return ch
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old)
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
    import termios

    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    new = termios.tcgetattr(fd)
    new[3] = new[3] & ~termios.ICANON & ~termios.ECHO
    termios.tcsetattr(fd, termios.TCSANOW, new)
    return old


def restore(settings):
    import termios
    import sys

    fd = sys.stdin.fileno()
    termios.tcsetattr(fd, termios.TCSADRAIN, settings)


def cleanup():
    import sys

    sys.stdout.write("\033[2J\033[H\033[?25h\r\n")
    sys.stdout.flush()
