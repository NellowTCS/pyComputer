"""
Shell subsystem: main command loop, history, autocomplete.
"""

from .commands import BUILTIN_COMMANDS
from .parser import parse_command
import readline

class Shell:
    def __init__(self, kernel=None):
        self.history = []
        self.kernel = kernel
        self._setup_readline()

    def _setup_readline(self):
        readline.parse_and_bind('tab: complete')
        readline.set_completer(self._completer)

    def _completer(self, text, state):
        options = [cmd for cmd in BUILTIN_COMMANDS if cmd.startswith(text)]
        if state < len(options):
            return options[state]
        return None

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
