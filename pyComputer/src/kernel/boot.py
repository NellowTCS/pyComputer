"""
Boot subsystem: renders ASCII logo, prints fake hardware logs.
"""

import os
import time

from src.fs.vfs import VFS


def _load_settings():
    settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
    if os.path.exists(settings_path):
        try:
            import json
            with open(settings_path) as f:
                return json.load(f)
        except Exception:
            pass
    return {}


class Boot:
    def __init__(self, logo_path=None):
        self.vfs = VFS()
        if logo_path is None:
            self.logo_path = self.vfs.abspath("boot/logo.txt")
        else:
            self.logo_path = self.vfs.abspath(logo_path)
        self.start_time = time.time()
        self.settings = _load_settings()

    def render_logo(self):
        if not self.settings.get("show_splash", True):
            print("\033[2J\033[H", end="")
            return
        try:
            with open(self.logo_path) as f:
                print(f.read())
        except FileNotFoundError:
            print(f"[boot] Logo not found at {self.logo_path}.")

    def print_hardware_logs(self):
        print("[boot] pyComputer Kernel v0.1.0")
        print("[boot] Initializing subsystems...")
        print("[boot] Checking memory...")
        print("[boot] All systems normal.")
        print(f"[boot] Uptime: {self.uptime():.2f} seconds")

    def uptime(self):
        return time.time() - self.start_time
