"""
Shell commands: built-in commands
"""

from pycomputer.shell.commands.help import cmd_help
from pycomputer.shell.commands.exit import cmd_exit
from pycomputer.shell.commands.echo import cmd_echo
from pycomputer.shell.commands.ls import cmd_ls
from pycomputer.shell.commands.cat import cmd_cat
from pycomputer.shell.commands.edit import cmd_edit
from pycomputer.shell.commands.run import cmd_run
from pycomputer.shell.commands.pkg import cmd_pkg
from pycomputer.shell.commands.clear import cmd_clear
from pycomputer.shell.commands.cd import cmd_cd
from pycomputer.shell.commands.rm import cmd_rm

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
