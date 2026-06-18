"""
pyComputer SDK: re-exports from pycomputer for standalone app development
"""

from pycomputer.ui.renderer import Renderer
from pycomputer.ui.input import get_key, Key, web_input_queue, setup_raw, restore, cleanup
from pycomputer.ui.widgets import Dialog
from pycomputer.utils.platform import is_web, is_native

__all__ = [
    "Renderer",
    "get_key",
    "Key",
    "web_input_queue",
    "setup_raw",
    "restore",
    "cleanup",
    "Dialog",
    "is_web",
    "is_native",
]
