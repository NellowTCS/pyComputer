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

    def wake_process(self, process: Process):
        if process.state == "waiting":
            process.state = "ready"

    async def run(self):
        while self.processes:
            for process in list(self.processes):
                if process.state == "terminated":
                    self.processes.remove(process)
                    continue
                if process.state == "ready":
                    process.start()
                if process.task:
                    try:
                        await asyncio.wait([process.task], timeout=0.01)
                    except Exception:
                        pass
                if process.task and process.task.done():
                    process.state = "terminated"
            await asyncio.sleep(0)  # Yield to event loop
