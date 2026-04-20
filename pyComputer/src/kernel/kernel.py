"""
pyComputer Kernel
Initializes subsystems, starts boot sequence, launches shell, runs main async event loop.
"""

import asyncio
from pyComputer.src.kernel.boot import Boot
from pyComputer.src.kernel.process import Process
from pyComputer.src.kernel.scheduler import Scheduler
from pyComputer.src.kernel.io import IO
from pyComputer.src.kernel.loader import Loader
from pyComputer.src.kernel.registry import Registry

class Kernel:
    def __init__(self):
        self.boot = Boot()
        self.process = None  # Will be created as needed
        self.scheduler = Scheduler()
        self.io = IO()
        self.loader = Loader()
        self.registry = Registry()

    def initialize(self):
        print("[kernel] Initializing subsystems...")
        # All subsystems are initialized in __init__

    def boot_sequence(self):
        print("[kernel] Boot sequence starting...")
        self.boot.render_logo()
        self.boot.print_hardware_logs()

    def launch_shell(self):
        print("[kernel] Launching shell...")
        # Placeholder for shell launch logic
        # Would eventually create a shell process and add to scheduler

    async def run(self):
        print("[kernel] Running main event loop...")
        await self.scheduler.run()


def main():
    kernel = Kernel()
    kernel.initialize()
    kernel.boot_sequence()
    kernel.launch_shell()
    # To run the async event loop, use: asyncio.run(kernel.run())

if __name__ == "__main__":
    main()
