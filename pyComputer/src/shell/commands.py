"""
Shell commands: built-in commands (ls, cat, edit, run, pkg, help).
"""

from .commands.help import cmd_help
from .commands.exit import cmd_exit
from .commands.echo import cmd_echo
from .commands.ls import cmd_ls
from .commands.cat import cmd_cat
from .commands.edit import cmd_edit
from .commands.run import cmd_run
from .commands.pkg import cmd_pkg

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
