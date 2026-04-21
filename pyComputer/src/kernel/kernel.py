"""
pyComputer Kernel
Initializes subsystems, starts boot sequence, launches shell, runs main async event loop.
"""

import asyncio
from ..shell.shell import Shell
from .boot import Boot
from .process import Process
from .scheduler import Scheduler
from .io import IO
from .loader import Loader
from .registry import Registry

class Kernel:
    def __init__(self):
        self.boot = Boot()
        self.scheduler = Scheduler()
        self.io = IO()
        self.loader = Loader()
        self.registry = Registry()
        self.shell = Shell(kernel=self)

    def initialize(self):
        print("[kernel] Initializing subsystems...")
        # All subsystems are initialized in __init__

    def boot_sequence(self):
        print("[kernel] Boot sequence starting...")
        self.boot.render_logo()
        self.boot.print_hardware_logs()

    def launch_shell(self):
        print("[kernel] Launching shell...")
        # Add the shell as a process to the scheduler
        async def shell_coro():
            self.shell.run()
        self.scheduler.add_process(Process(shell_coro(), name="shell"))

    async def run(self):
        print("[kernel] Running main event loop...")
        await self.scheduler.run()


def main():
    kernel = Kernel()
    kernel.initialize()
    kernel.boot_sequence()
    kernel.launch_shell()
    asyncio.run(kernel.run())

if __name__ == "__main__":
    main()
