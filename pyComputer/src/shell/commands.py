"""
Shell commands: built-in commands (ls, cat, edit, run, pkg, help).
"""

def cmd_help(shell, *args):
    print("Available commands: help, exit, echo, ls, cat, edit, run, pkg")

def cmd_exit(shell, *args):
    print("[shell] Exiting shell.")
    raise SystemExit

def cmd_echo(shell, *args):
    print(' '.join(args))

def cmd_ls(shell, *args):
    print("[ls] (stub) Listing files...")

def cmd_cat(shell, *args):
    print("[cat] (stub) Displaying file contents...")

def cmd_edit(shell, *args):
    print("[edit] (stub) Editing file...")

def cmd_run(shell, *args):
    print("[run] (stub) Running app...")

def cmd_pkg(shell, *args):
    print("[pkg] (stub) Package manager...")

BUILTIN_COMMANDS = {
    "help": cmd_help,
    "exit": cmd_exit,
    "echo": cmd_echo,
    "ls": cmd_ls,
    "cat": cmd_cat,
    "edit": cmd_edit,
    "run": cmd_run,
    "pkg": cmd_pkg,
}
