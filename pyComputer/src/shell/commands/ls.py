def cmd_ls(shell, *args):
    import os
    shell.kernel.loader.discover_apps()
    print("[ls] Available apps:")
    for app in shell.kernel.loader.apps:
        print(f"  {app}")
    print("[ls] Files in current directory:")
    for f in os.listdir(os.getcwd()):
        print(f"  {f}")
