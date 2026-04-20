"""
Shell subsystem: main command loop, history, autocomplete.
"""

class Shell:
    def __init__(self):
        self.history = []

    def run(self):
        print("[shell] Welcome to pyComputer shell!")
        while True:
            try:
                cmd = input("$ ")
                if cmd.strip() == "exit":
                    print("[shell] Exiting shell.")
                    break
                self.history.append(cmd)
                self.execute(cmd)
            except (EOFError, KeyboardInterrupt):
                print("\n[shell] Exiting shell.")
                break

    def execute(self, cmd):
        print(f"[shell] You entered: {cmd}")
        # Placeholder for command execution logic
