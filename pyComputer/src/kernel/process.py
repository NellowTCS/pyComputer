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
        self.task = asyncio.create_task(self.coro)
        self.state = "running"

    def terminate(self):
        if self.task:
            self.task.cancel()
        self.state = "terminated"
