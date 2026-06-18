"""
pyComputer SDK: re-exports from pycomputer for standalone app development
"""

from pycomputer.ui.renderer import Renderer, _TUIRO_THEMES, _CUSTOM_THEMES
from pycomputer.ui.input import get_key, Key, web_input_queue, setup_raw, restore, cleanup
from pycomputer.ui.widgets import Dialog
from pycomputer.ui.theme import Theme, Color, Bg, Style, Preset
from pycomputer.utils.platform import is_web, is_native
from pycomputer.utils.text import truncate, wrap, indent, pad_center, pad_left, pad_right, strip_ansi

__all__ = [
    "Renderer",
    "_TUIRO_THEMES",
    "_CUSTOM_THEMES",
    "get_key",
    "Key",
    "web_input_queue",
    "setup_raw",
    "restore",
    "cleanup",
    "Dialog",
    "Theme",
    "Color",
    "Bg",
    "Style",
    "Preset",
    "is_web",
    "is_native",
    "truncate",
    "wrap",
    "indent",
    "pad_center",
    "pad_left",
    "pad_right",
    "strip_ansi",
]
