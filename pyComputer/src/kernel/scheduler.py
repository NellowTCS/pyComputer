"""
Scheduler subsystem: round-robin (no, not Red Robin, sadly) scheduling, yields between processes.
"""

import asyncio
from .process import Process

class Scheduler:
    def __init__(self):
        self.processes = []

    def add_process(self, process: Process):
        self.processes.append(process)

    async def run(self):
        while self.processes:
            for process in list(self.processes):
                if process.state == "terminated":
                    self.processes.remove(process)
                    continue
                if process.state == "ready":
                    process.start()
                await asyncio.sleep(0)  # Yield control
