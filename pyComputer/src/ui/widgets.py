"""
widgets.py: TUI widgets: buttons, lists, menus, dialogs, progress bar.
"""

from typing import Callable, Optional, Any

class Widget:
    def __init__(self, x: int = 0, y: int = 0, width: int = 0, height: int = 0):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.focused = False

    def render(self) -> str:
        return ""

    def handle_key(self, key: str) -> bool:
        return False

class Button(Widget):
    def __init__(self, label: str, x: int = 0, y: int = 0, on_click: Optional[Callable] = None):
        super().__init__(x, y, len(label) + 2, 1)
        self.label = label
        self.on_click = on_click

    def render(self) -> str:
        prefix = ">" if self.focused else " "
        return f"[{prefix} {self.label} {prefix}]"

    def handle_key(self, key: str) -> bool:
        if key == "\r" and self.on_click:
            self.on_click()
            return True
        return False

class ListBox(Widget):
    def __init__(self, items: list[str], x: int = 0, y: int = 0, width: int = 20, height: int = 10, on_select: Optional[Callable] = None):
        super().__init__(x, y, width, height)
        self.items = items
        self.selected = 0
        self.scroll = 0
        self.on_select = on_select

    def render(self) -> str:
        lines = []
        visible = self.items[self.scroll:self.scroll + self.height]
        for i, item in enumerate(visible):
            idx = self.scroll + i
            prefix = ">" if idx == self.selected else " "
            truncated = item[:self.width - 2]
            lines.append(f"{prefix}{truncated}")
        return "\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key == "\x1b[A":
            self.selected = max(0, self.selected - 1)
            return True
        elif key == "\x1b[B":
            self.selected = min(len(self.items) - 1, self.selected + 1)
            return True
        elif key == "\r" and self.on_select:
            self.on_select(self.items[self.selected])
            return True
        return False

class Menu(Widget):
    def __init__(self, items: list[tuple[str, Callable]], x: int = 0, y: int = 0, on_select: Optional[Callable] = None):
        super().__init__(x, y, 20, len(items))
        self.items = items
        self.selected = 0
        self.on_select = on_select

    def render(self) -> str:
        lines = []
        for i, (label, _) in enumerate(self.items):
            prefix = ">" if i == self.selected else " "
            lines.append(f"{prefix} {label}")
        return "\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key == "\x1b[A":
            self.selected = max(0, self.selected - 1)
            return True
        elif key == "\x1b[B":
            self.selected = min(len(self.items) - 1, self.selected + 1)
            return True
        elif key == "\r":
            label, handler = self.items[self.selected]
            if handler:
                handler()
            if self.on_select:
                self.on_select(label)
            return True
        return False

class Dialog(Widget):
    def __init__(self, title: str, message: str, buttons: list[tuple[str, Callable]], x: int = 0, y: int = 0, width: int = 30, height: int = 5):
        super().__init__(x, y, width, height)
        self.title = title
        self.message = message
        self.buttons = buttons
        self.selected = 0

    def render(self) -> str:
        lines = []
        lines.append("╔" + "═" * (self.width - 2) + "╗")
        lines.append("║" + self.title.center(self.width - 2) + "║")
        lines.append("╠" + "═" * (self.width - 2) + "╣")
        msg_lines = [self.message[i:i+self.width-2] for i in range(0, len(self.message), self.width-2)]
        for line in msg_lines:
            lines.append("║" + line.center(self.width - 2) + "║")
        button_str = "  ".join(f"[{b[0]}]" for b in self.buttons)
        lines.append("║" + button_str.center(self.width - 2) + "║")
        lines.append("╚" + "═" * (self.width - 2) + "╝")
        return "\n".join(lines)

    def handle_key(self, key: str) -> bool:
        if key in [str(i) for i in range(len(self.buttons))]:
            idx = int(key)
            if 0 <= idx < len(self.buttons):
                _, handler = self.buttons[idx]
                if handler:
                    handler()
                return True
        return False

class ProgressBar(Widget):
    def __init__(self, value: float = 0, x: int = 0, y: int = 0, width: int = 20, label: str = ""):
        super().__init__(x, y, width, 1)
        self.value = value
        self.label = label

    def set_value(self, value: float):
        self.value = max(0, min(1, value))

    def render(self) -> str:
        filled = int(self.value * (self.width - 2))
        bar = "█" * filled + "░" * (self.width - 2 - filled)
        return f"{self.label}: [{bar}]"

class Input(Widget):
    def __init__(self, x: int = 0, y: int = 0, width: int = 20, placeholder: str = "", on_change: Optional[Callable] = None):
        super().__init__(x, y, width, 1)
        self.value = ""
        self.placeholder = placeholder
        self.on_change = on_change
        self.cursor = 0

    def render(self) -> str:
        text = self.value or self.placeholder
        cursor_char = "_" if self.focused else ""
        return f"> {text}{cursor_char}"

    def handle_key(self, key: str) -> bool:
        if key == "\x7f":
            if self.value and self.cursor > 0:
                self.value = self.value[:self.cursor-1] + self.value[self.cursor:]
                self.cursor -= 1
        elif key == "\x1b[D":
            self.cursor = max(0, self.cursor - 1)
        elif key == "\x1b[C":
            self.cursor = min(len(self.value), self.cursor + 1)
        else:
            self.value = self.value[:self.cursor] + key + self.value[self.cursor:]
            self.cursor += 1
            if self.on_change:
                self.on_change(self.value)
        return True