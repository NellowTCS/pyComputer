"""
Shell subsystem: main command loop, history, autocomplete.
"""

from .commands import BUILTIN_COMMANDS
from .parser import parse_command

class Shell:
    def __init__(self):
        self.history = []

    def run(self):
        print("[shell] Welcome to pyComputer shell!")
        while True:
            try:
                cmd = input("$ ")
                if not cmd.strip():
                    continue
                self.history.append(cmd)
                self.execute(cmd)
            except (EOFError, KeyboardInterrupt, SystemExit):
                print("\n[shell] Exiting shell.")
                break

    def execute(self, cmd):
        parts = parse_command(cmd)
        if not parts:
            return
        command, *args = parts
        func = BUILTIN_COMMANDS.get(command)
        if func:
            try:
                func(self, *args)
            except SystemExit:
                raise
            except Exception as e:
                print(f"[shell] Error: {e}")
        else:
            print(f"[shell] Unknown command: {command}")
