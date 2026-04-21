"""
renderer.py: TUI renderer (canvas or <pre> based), double-buffering (stub).
"""

class Renderer:
    def print_box(self, text):
        lines = text.splitlines()
        width = max(len(line) for line in lines)
        print("+" + "-" * width + "+")
        for line in lines:
            print("|" + line.ljust(width) + "|")
        print("+" + "-" * width + "+")

    def print_text(self, text):
        print(text)
