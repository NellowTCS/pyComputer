"""
renderer.py: TUI renderer using tuiro, double-buffering.
"""

import sys
from tuiro import TUI
from src.ui.theme import Color, Style, RESET


class Renderer:
    def __init__(self, ci_mode=False, theme="default"):
        self.tui = TUI(ci_mode=ci_mode, theme=theme)

    def section(self, title):
        self.tui.section(title)

    def subsection(self, title):
        self.tui.subsection(title)

    def success(self, message):
        self.tui.success(message)

    def info(self, message):
        self.tui.info(message)

    def warning(self, message):
        self.tui.warning(message)

    def error(self, message):
        self.tui.error(message)

    def command(self, cmd):
        self.tui.command(cmd)

    def result(self, label, value):
        self.tui.result(label, value)

    def table(self, rows):
        self.tui.table(rows)

    def banner(self, title):
        self.tui.banner(title)

    def spinner(self, message):
        return self.tui.spinner(message)

    def step(self, title):
        return self.tui.step(title)

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
        lines = box_str.split("\n")
        for i, line in enumerate(lines):
            self.move(x, y + i).write(line)
        return self
