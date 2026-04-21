"""
Process subsystem: defines Process objects, wraps coroutines, tracks state.
"""

import asyncio
from typing import Coroutine, Any

class Process:
    def __init__(self, coro: Coroutine, name: str = "process"):
        self.coro = coro
        self.name = name
        self.state = "ready"  # ready, running, waiting, terminated
        self.task = None

    def start(self):
        if not self.task or self.task.done():
            self.task = asyncio.create_task(self.coro)
            self.state = "running"

    def wait(self):
        self.state = "waiting"

    def wake(self):
        if self.state == "waiting":
            self.state = "ready"

    def terminate(self):
        if self.task:
            self.task.cancel()
        self.state = "terminated"
