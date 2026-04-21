"""
cd.py: Change directory command for shell
"""
from src.fs.vfs import VFS
import os

def cmd_cd(shell, *args):
    vfs = VFS()
    if not hasattr(shell, "cwd"):
        shell.cwd = "/"
    if not args:
        shell.cwd = "/"
        os.chdir(vfs.abspath("/"))
        print(f"[cd] Changed to root directory.")
        return
    path = args[0]
    abspath = vfs.abspath(path)
    if vfs.exists(path) and os.path.isdir(abspath):
        shell.cwd = path
        os.chdir(abspath)
        print(f"[cd] Changed directory to {path}")
    else:
        print(f"[cd] Directory not found: {path}")
