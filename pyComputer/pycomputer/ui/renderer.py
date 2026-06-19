"""
renderer.py: TUI renderer using tuiro, double-buffering.
tuiro import is deferred, all basic ANSI methods work without it.
"""

import sys
from pycomputer.ui.theme import Color, Style, RESET
from pycomputer.ui.palettes import RetroPalette, LightPalette, DarkPalette


_current_theme = "default"

_TUIRO_THEMES = ["default", "mono", "pastel"]

_CUSTOM_THEMES = {
    "retro": RetroPalette,
    "light": LightPalette,
    "dark": DarkPalette,
}


def _tuiro_available():
    try:
        import tuiro
        return True
    except ImportError:
        return False


_TUIRO_OK = _tuiro_available()


def _make_tui(ci_mode=False, theme="default"):
    from tuiro import TUI
    if theme in _CUSTOM_THEMES:
        return TUI(ci_mode=ci_mode, theme=_CUSTOM_THEMES[theme]())
    return TUI(ci_mode=ci_mode, theme=theme)


class Renderer:
    def __init__(self, ci_mode=False, theme="default"):
        self._tui = None
        self._ci_mode = ci_mode
        self._theme_name = theme
        if _TUIRO_OK:
            self._tui = _make_tui(ci_mode, theme)
        global _current_theme
        _current_theme = theme

    @property
    def tui(self):
        if self._tui is None and _TUIRO_OK:
            self._tui = _make_tui(self._ci_mode, self._theme_name)
        return self._tui

    def set_theme(self, theme_name):
        global _current_theme
        _current_theme = theme_name
        self._theme_name = theme_name
        if _TUIRO_OK:
            self._tui = _make_tui(ci_mode=self._ci_mode, theme=theme_name)
        else:
            self._tui = None

    def get_theme(self):
        global _current_theme
        return _current_theme

    def section(self, title):
        if self.tui:
            self.tui.section(title)

    def subsection(self, title):
        if self.tui:
            self.tui.subsection(title)

    def success(self, message):
        if self.tui:
            self.tui.success(message)

    def info(self, message):
        if self.tui:
            self.tui.info(message)

    def warning(self, message):
        if self.tui:
            self.tui.warning(message)

    def error(self, message):
        if self.tui:
            self.tui.error(message)

    def command(self, cmd):
        if self.tui:
            self.tui.command(cmd)

    def result(self, label, value):
        if self.tui:
            self.tui.result(label, value)

    def table(self, rows):
        if self.tui:
            self.tui.table(rows)

    def banner(self, title):
        if self.tui:
            self.tui.banner(title)

    def spinner(self, message):
        if self.tui:
            return self.tui.spinner(message)
        raise RuntimeError("tuiro not available")

    def step(self, title):
        if self.tui:
            return self.tui.step(title)
        raise RuntimeError("tuiro not available")

    def move(self, x, y):
        sys.stdout.write(f"\033[{y};{x}H")
        return self

    def write(self, text):
        sys.stdout.write(text)
        return self

    def flush(self):
        sys.stdout.flush()
        return self

    def clear(self):
        sys.stdout.write("\033[2J\033[H")
        return self

    def clear_line(self):
        sys.stdout.write("\033[2K")
        return self

    def hide_cursor(self):
        sys.stdout.write("\033[?25l")
        return self

    def show_cursor(self):
        sys.stdout.write("\033[?25h")
        return self

    def bold(self, text):
        return f"{Style.BOLD}{text}{RESET}"

    def dim(self, text):
        return f"{Style.DIM}{text}{RESET}"

    def green(self, text):
        return f"{Color.GREEN}{text}{RESET}"

    def bright_green(self, text):
        return f"{Color.BRIGHT_GREEN}{text}{RESET}"

    def red(self, text):
        return f"{Color.RED}{text}{RESET}"

    def bright_red(self, text):
        return f"{Color.BRIGHT_RED}{text}{RESET}"

    def yellow(self, text):
        return f"{Color.YELLOW}{text}{RESET}"

    def cyan(self, text):
        return f"{Color.CYAN}{text}{RESET}"

    def bright_cyan(self, text):
        return f"{Color.BRIGHT_CYAN}{text}{RESET}"

    def box(self, width, height, title=None):
        lines = []
        lines.append("╔" + "═" * (width - 2) + "╗")
        if title:
            title_line = f"║ {title} " + " " * (width - len(title) - 4) + "║"
            title_line = title_line[: width - 1] + "║"
            lines.append(title_line)
            if height > 3:
                lines.append("╠" + "═" * (width - 2) + "╣")
        else:
            lines.append("║" + " " * (width - 2) + "║")
        for _ in range(height - 2 - (1 if title else 0)):
            lines.append("║" + " " * (width - 2) + "║")
        lines.append("╚" + "═" * (width - 2) + "╝")
        return "\n".join(lines)

    def box_at(self, x, y, width, height, title=None):
        box_str = self.box(width, height, title)
        for i, line in enumerate(box_str.split("\n")):
            self.move(x, y + i).write(line)
        return self
