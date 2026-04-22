"""
logging.py: Logging utilities with levels, formatting, handlers.
"""

import sys
import time
from enum import IntEnum
from typing import Optional


class Level(IntEnum):
    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40
    CRITICAL = 50


class Logger:
    def __init__(self, name: str = "", level: int = Level.INFO):
        self.name = name
        self.level = level
        self.handlers = [sys.stderr]
        self.format = "%(level)s%(message)s%(reset)s"
        self.colors = {
            Level.DEBUG: "\033[90m",
            Level.INFO: "\033[32m",
            Level.WARNING: "\033[33m",
            Level.ERROR: "\033[31m",
            Level.CRITICAL: "\033[35;1m",
        }
        self.reset = "\033[0m"

    def log(self, level: Level, message: str):
        if level < self.level:
            return
        color = self.colors.get(level, "")
        formatted = (
            self.format.replace("%(level)s", color)
            .replace("%(message)s", message)
            .replace("%(reset)s", self.reset)
        )
        for handler in self.handlers:
            handler.write(formatted + "\n")
            handler.flush()

    def debug(self, message: str):
        self.log(Level.DEBUG, f"[{self.name}] {message}" if self.name else message)

    def info(self, message: str):
        self.log(Level.INFO, f"[{self.name}] {message}" if self.name else message)

    def warning(self, message: str):
        self.log(Level.WARNING, f"[{self.name}] {message}" if self.name else message)

    def error(self, message: str):
        self.log(Level.ERROR, f"[{self.name}] {message}" if self.name else message)

    def critical(self, message: str):
        self.log(Level.CRITICAL, f"[{self.name}] {message}" if self.name else message)


_default = Logger()


def debug(msg: str):
    _default.debug(msg)


def info(msg: str):
    _default.info(msg)


def warning(msg: str):
    _default.warning(msg)


def error(msg: str):
    _default.error(msg)


def critical(msg: str):
    _default.critical(msg)
