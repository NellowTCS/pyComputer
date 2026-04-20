"""
Boot subsystem: renders ASCII logo, prints fake hardware logs.
"""

import os

class Boot:
    def __init__(self, logo_path=None):
        if logo_path is None:
            # Always resolve relative to this file's location
            self.logo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../boot/logo.txt"))
        else:
            self.logo_path = logo_path

    def render_logo(self):
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
