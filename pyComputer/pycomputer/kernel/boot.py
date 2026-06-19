"""
Boot subsystem: renders ASCII logo, prints fake hardware logs.
"""

import os
import shutil
import time

from pycomputer.fs.vfs import VFS


def _data_dir():
    env = os.environ.get("PYCOMPUTER_DATA_DIR")
    if env:
        return os.path.abspath(env)
    return os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../../data")
    )


def _root_dir():
    env = os.environ.get("PYCOMPUTER_ROOT_DIR")
    if env:
        return os.path.abspath(env)
    return os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../../root")
    )


def ensure_data_dir():
    data = _data_dir()
    root = _root_dir()
    if not os.path.isdir(data):
        print("[boot] Initializing data disk from golden master...")
        staging = data + ".staging"
        if os.path.isdir(staging):
            shutil.rmtree(staging)
        shutil.copytree(root, staging)
        os.rename(staging, data)


def _load_settings():
    settings_path = os.path.join(_data_dir(), "apps/settings/config.json")
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
        print("[boot] pyComputer Kernel v0.1.1")
        print("[boot] Initializing subsystems...")
        print("[boot] Checking memory...")
        print("[boot] All systems normal.")
        print(f"[boot] Uptime: {self.uptime():.2f} seconds")

    def uptime(self):
        return time.time() - self.start_time
