"""
Shell command: clear the terminal screen.
"""

from src.utils.platform import is_web


def cmd_clear(shell, *args):
    if is_web():
        print("\033[2J\033[H", end="")
    else:
        import os

        os.system("clear")
