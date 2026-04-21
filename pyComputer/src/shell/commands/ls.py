from src.fs.vfs import VFS

def cmd_ls(shell, *args):
    vfs = VFS()
    cwd = getattr(shell, "cwd", "/")
    path = args[0] if args else cwd
    try:
        files = vfs.listdir(path)
        for f in files:
            print(f)
    except Exception as e:
        print(f"[ls] {e}")
