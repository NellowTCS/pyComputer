"""
theme.py: Colors, styles, presets for TUI rendering.
"""

from typing import Optional

RESET = "\033[0m"


class Color:
    BLACK = "\033[30m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"

    BRIGHT_BLACK = "\033[90m"
    BRIGHT_RED = "\033[91m"
    BRIGHT_GREEN = "\033[92m"
    BRIGHT_YELLOW = "\033[93m"
    BRIGHT_BLUE = "\033[94m"
    BRIGHT_MAGENTA = "\033[95m"
    BRIGHT_CYAN = "\033[96m"
    BRIGHT_WHITE = "\033[97m"


class Bg:
    BLACK = "\033[40m"
    RED = "\033[41m"
    GREEN = "\033[42m"
    YELLOW = "\033[43m"
    BLUE = "\033[44m"
    MAGENTA = "\033[45m"
    CYAN = "\033[46m"
    WHITE = "\033[47m"


class Style:
    BOLD = "\033[1m"
    DIM = "\033[2m"
    ITALIC = "\033[3m"
    UNDERLINE = "\033[4m"
    BLINK = "\033[5m"
    REVERSE = "\033[7m"
    HIDDEN = "\033[8m"


class Preset:
    def __init__(self, name: str, fg: str, bg: str = "", bold: bool = False):
        self.name = name
        self.fg = fg
        self.bg = bg
        self.bold = bold

    def apply(self, text: str) -> str:
        result = self.fg + text + RESET
        if self.bg:
            result = self.bg + result + RESET
        if self.bold:
            result = Style.BOLD + result + RESET
        return result


class Theme:
    def __init__(self, name: str = "default"):
        self.name = name
        self.presets = {}
        self._load_defaults()

    def _load_defaults(self):
        self.presets = {
            "header": Preset("header", Color.CYAN, bold=True),
            "success": Preset("success", Color.GREEN),
            "warning": Preset("warning", Color.YELLOW),
            "error": Preset("error", Color.RED),
            "info": Preset("info", Color.BLUE),
            "muted": Preset("muted", Color.BRIGHT_BLACK),
            "highlight": Preset("highlight", Color.BRIGHT_CYAN, bold=True),
            "border": Preset("border", Color.WHITE),
            "selected": Preset("selected", Color.BLUE, Bg.BLUE, bold=True),
            "text": Preset("text", Color.WHITE),
        }

    def get(self, name: str) -> Optional[Preset]:
        return self.presets.get(name)

    def add(self, name: str, preset: Preset):
        self.presets[name] = preset


default = Theme()

retro = Theme("retro")
retro.add("green", Preset("green", "\033[92m", bold=True))
retro.add("amber", Preset("amber", "\033[93m", bold=True))


def apply(name: str, text: str) -> str:
    preset = default.get(name)
    if preset:
        return preset.apply(text)
    return text
