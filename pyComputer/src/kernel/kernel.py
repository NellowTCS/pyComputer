"""
pyComputer Kernel
Initializes subsystems, starts boot sequence, launches shell, runs main async event loop.
"""

import asyncio
import hashlib
import os
import json
from ..shell.shell import Shell
from .boot import Boot
from .process import Process
from .scheduler import Scheduler
from .io import IO
from .loader import Loader
from .registry import Registry
from ..ui.renderer import Renderer


def _load_settings():
    settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
    if os.path.exists(settings_path):
        try:
            with open(settings_path) as f:
                return json.load(f)
        except Exception:
            pass
    return {"theme": "default"}


_settings = _load_settings()


def _require_login():
    password_hash = _settings.get("password", "")
    if not password_hash:
        return None
    from src.stdlib.appstdlib import input, error
    import hashlib
    while True:
        pw = input("Password: ").strip()
        if not pw:
            error("Login required.")
            continue
        hashpw = hashlib.sha256(pw.encode()).hexdigest()[:16]
        if hashpw == password_hash:
            return _settings.get("username", "user")
        error("Invalid password.")


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

    def boot_sequence(self):
        print("[kernel] Boot sequence starting...")
        self.boot.render_logo()
        self.boot.print_hardware_logs()

    def launch_shell(self):
        print("[kernel] Launching shell...")

        async def shell_coro():
            self.shell.run()

        self.scheduler.add_process(Process(shell_coro(), name="shell"))

    async def run(self):
        print("[kernel] Running main event loop...")
        try:
            await self.scheduler.run()
        except asyncio.CancelledError:
            print("[kernel] Event loop cancelled.")


def main():
    global _settings
    _settings = _load_settings()
    theme = _settings.get("theme", "default")
    from ..stdlib.appstdlib import set_theme
    set_theme(theme)
    
    if _settings.get("password"):
        user = _require_login()
        if not user:
            print("[kernel] Authentication required. Exiting.")
            return
        print(f"[kernel] Welcome back, {user}!")
    
    kernel = Kernel()
    kernel.initialize()
    kernel.boot_sequence()
    kernel.launch_shell()
    try:
        asyncio.run(kernel.run())
    except (KeyboardInterrupt, asyncio.CancelledError):
        print("[kernel] Shutdown complete.")
