"""
Shell parser: tokenization, quoting rules.
"""

import shlex

def parse_command(cmd):
    """Parse a shell command string into command and args, handling quotes."""
    return shlex.split(cmd)
