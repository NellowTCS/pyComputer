"""
Boot subsystem: renders ASCII logo, prints "hardware logs".
"""

class Boot:
    def __init__(self, logo_path="/boot/logo.txt"):
        self.logo_path = logo_path

    def render_logo(self):
        try:
            with open(self.logo_path) as f:
                print(f.read())
        except FileNotFoundError:
            print("[boot] Logo not found.")

    def print_hardware_logs(self):
        print("[boot] pyComputer Kernel v0.1.0")
        print("[boot] Initializing subsystems...")
        print("[boot] Checking memory...")
        print("[boot] All systems normal.")
