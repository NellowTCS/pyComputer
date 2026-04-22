"""
text.py: Text utilities for formatting, manipulation.
"""

import re
from typing import Optional


def truncate(text: str, length: int, ellipsis: str = "...") -> str:
    if len(text) <= length:
        return text
    return text[: length - len(ellipsis)] + ellipsis


def wrap(text: str, width: int) -> list[str]:
    words = text.split()
    lines = []
    current = []
    for word in words:
        if not current:
            current.append(word)
        elif len(" ".join(current)) + len(word) + 1 <= width:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def indent(text: str, spaces: int = 4, first: bool = False) -> str:
    prefix = " " * spaces
    lines = text.split("\n")
    if not first:
        return "\n".join(prefix + line for line in lines)
    return lines[0] + "\n" + "\n".join(prefix + line for line in lines[1:])


def pad_center(text: str, width: int, fill: str = " ") -> str:
    padding = width - len(text)
    if padding <= 0:
        return text
    left = padding // 2
    right = padding - left
    return fill * left + text + fill * right


def pad_left(text: str, width: int, fill: str = " ") -> str:
    return fill * (width - len(text)) + text if width > len(text) else text


def pad_right(text: str, width: int, fill: str = " ") -> str:
    return text + fill * (width - len(text)) if width > len(text) else text


def strip_ansi(text: str) -> str:
    return re.sub(r"\x1b\[[0-9;]*m", "", text)


def strip_color(text: str) -> str:
    return strip_ansi(text)


def highlight(text: str, term: str, fill: Optional[str] = None) -> str:
    if not term:
        return text
    pattern = re.compile(re.escape(term), re.IGNORECASE)
    if fill:
        return pattern.sub(fill, text)
    return pattern.sub(lambda m: f"\033[1m{m.group()}\033[0m", text)


def lines(text: str) -> list[str]:
    return text.split("\n")


def unlines(lines: list[str]) -> str:
    return "\n".join(lines)


def uniq(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result
