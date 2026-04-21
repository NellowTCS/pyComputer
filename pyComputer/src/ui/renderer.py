"""
renderer.py: TUI renderer using tuiro, double-buffering.
"""

from tuiro import TUI

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
