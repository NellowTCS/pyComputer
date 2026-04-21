"""
Shell command: clear the terminal screen.
"""

def cmd_clear(shell, *args):
    import os
    os.system('clear')
