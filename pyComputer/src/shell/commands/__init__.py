# Makes shell.commands a package

from .help import cmd_help
from .exit import cmd_exit
from .echo import cmd_echo
from .ls import cmd_ls
from .cat import cmd_cat
from .edit import cmd_edit
from .run import cmd_run
from .pkg import cmd_pkg

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
