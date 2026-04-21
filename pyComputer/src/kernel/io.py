"""
IO subsystem: routes stdin/stdout, supports fullscreen TUI mode.
"""

import sys

class IO:
    def __init__(self):
        self.stdin = sys.stdin
        self.stdout = sys.stdout
        self.fullscreen = False
        self.tui_output = None

    def set_fullscreen(self, enable: bool):
        self.fullscreen = enable

    def set_tui_output(self, output_func):
        self.tui_output = output_func

    def write(self, data: str):
        if self.fullscreen and self.tui_output:
            self.tui_output(data)
        else:
            self.stdout.write(data)
            self.stdout.flush()

    def read(self):
        return self.stdin.readline()
