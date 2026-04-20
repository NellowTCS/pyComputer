"""
IO subsystem: routes stdin/stdout, supports TUIs.
"""

class IO:
    def __init__(self):
        self.stdin = None
        self.stdout = None
        self.fullscreen = False

    def set_fullscreen(self, enable: bool):
        self.fullscreen = enable

    def write(self, data: str):
        if self.stdout:
            self.stdout.write(data)
        else:
            print(data, end="")

    def read(self):
        if self.stdin:
            return self.stdin.read()
        else:
            return input()
