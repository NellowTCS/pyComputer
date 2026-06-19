"""
Custom palettes for pyComputer themes.
"""

from tuiro.palette import Palette
from tuiro.colors import Colors


class RetroPalette(Palette):
    """Retro green phosphor theme."""
    info = Colors.BRIGHT_GREEN
    success = Colors.BRIGHT_GREEN
    warning = Colors.BRIGHT_YELLOW
    error = Colors.BRIGHT_RED
    accent = Colors.BRIGHT_GREEN
    dim = Colors.BRIGHT_BLACK
    text = Colors.BRIGHT_GREEN


class LightPalette(Palette):
    """Light theme for daytime use."""
    info = Colors.BLUE
    success = Colors.GREEN
    warning = Colors.YELLOW
    error = Colors.RED
    accent = Colors.BLUE
    dim = Colors.BLACK
    text = Colors.BLACK


class DarkPalette(Palette):
    """Dark theme for nighttime use."""
    info = Colors.BRIGHT_CYAN
    success = Colors.BRIGHT_GREEN
    warning = Colors.BRIGHT_YELLOW
    error = Colors.BRIGHT_RED
    accent = Colors.BRIGHT_MAGENTA
    dim = Colors.BLACK
    text = Colors.WHITE