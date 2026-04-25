"""
appstdlib.py: Standard library for pyComputer apps.
Provides unified input/output, error reporting, and common helpers.
"""


from src.utils.platform import pyc_input, is_web, is_native
from src.ui.renderer import Renderer
from src.utils.text import truncate, wrap, indent, pad_center, pad_left, pad_right, strip_ansi
from src.fs.vfs import VFS
from src.utils.logging import Logger, Level
import sys
import traceback
import time
import os

__all__ = [
    # I/O
    "input", "info", "error", "success", "warning", "confirm", "pause",
    # UI/Renderer
    "section", "subsection", "banner", "table", "spinner", "step",
    "clear", "clear_line", "hide_cursor", "show_cursor",
    "bold", "dim", "green", "red", "yellow", "cyan",
    "box", "box_at",
    # Text utils
    "truncate", "wrap", "indent", "pad_center", "pad_left", "pad_right", "strip_ansi",
    # FS
    "VFS",
    # Logging
    "Logger", "Level",
    # Other
    "print_exception", "sleep", "get_env", "set_env", "app_exit", "print_table", "print_banner", "ask_choice"
]

def print_exception(e: Exception):
    """Print a formatted exception with traceback."""
    tb = ''.join(traceback.format_exception(type(e), e, e.__traceback__))
    error(tb)

def sleep(seconds: float):
    time.sleep(seconds)

def get_env(key: str, default=None):
    return os.environ.get(key, default)

def set_env(key: str, value: str):
    os.environ[key] = value

def app_exit(code=0):
    sys.exit(code)

def print_table(rows):
    """Print a table (list of lists)."""
    r.table(rows)

def print_banner(msg: str):
    r.banner(msg)

def ask_choice(prompt: str, choices: list) -> str:
    """Prompt user to select from choices."""
    while True:
        ans = pyc_input(f"{prompt} {choices}: ").strip().lower()
        if ans in choices:
            return ans
        warning(f"Invalid choice: {ans}")

r = Renderer()

# I/O
def input(prompt: str = "") -> str:
    """Unified input for apps (web/native)."""
    return pyc_input(prompt)

def info(msg: str):
    r.info(msg)

def error(msg: str):
    r.error(msg)

def success(msg: str):
    r.success(msg)

def warning(msg: str):
    r.warning(msg)

def confirm(prompt: str = "Are you sure? [y/N] ") -> bool:
    ans = pyc_input(prompt).strip().lower()
    return ans in ("y", "yes")

def pause(msg: str = "Press Enter to continue..."):
    pyc_input(msg)

# UI/Renderer
def section(title: str):
    r.section(title)

def subsection(title: str):
    r.subsection(title)

def banner(title: str):
    r.banner(title)

def table(rows):
    r.table(rows)

def spinner(message: str):
    return r.spinner(message)

def step(title: str):
    return r.step(title)

def clear():
    r.clear()

def clear_line():
    r.clear_line()

def hide_cursor():
    r.hide_cursor()

def show_cursor():
    r.show_cursor()

def bold(text: str):
    return r.bold(text)

def dim(text: str):
    return r.dim(text)

def green(text: str):
    return r.green(text)

def red(text: str):
    return r.red(text)

def yellow(text: str):
    return r.yellow(text)

def cyan(text: str):
    return r.cyan(text)

def box(width, height, title=None):
    return r.box(width, height, title)

def box_at(x, y, width, height, title=None):
    return r.box_at(x, y, width, height, title)

# Text utils: truncate, wrap, indent, pad_center, pad_left, pad_right, strip_ansi (imported)
# FS: VFS (imported)
# Logging: Logger, Level (imported)
