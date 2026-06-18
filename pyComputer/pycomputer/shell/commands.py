"""
Shell commands: built-in commands
"""

from ...shell.commands.help import cmd_help
from ...shell.commands.exit import cmd_exit
from ...shell.commands.echo import cmd_echo
from ...shell.commands.ls import cmd_ls
from ...shell.commands.cat import cmd_cat
from ...shell.commands.edit import cmd_edit
from ...shell.commands.run import cmd_run
from ...shell.commands.pkg import cmd_pkg
from ...shell.commands.clear import cmd_clear
from ...shell.commands.cd import cmd_cd
from ...shell.commands.rm import cmd_rm

BUILTIN_COMMANDS = {
    "help": cmd_help,
    "exit": cmd_exit,
    "echo": cmd_echo,
    "ls": cmd_ls,
    "cat": cmd_cat,
    "edit": cmd_edit,
    "run": cmd_run,
    "pkg": cmd_pkg,
    "clear": cmd_clear,
    "cd": cmd_cd,
    "rm": cmd_rm,
}
