def cmd_pkg(shell, *args):
    from src.pkg.manager import PackageManager

    pm = PackageManager()
    if not args:
        pm.list()
        return
    action = args[0]
    if action == "list":
        pm.list()
    elif action == "install":
        if len(args) < 2:
            print("Usage: pkg install <source_path>")
            return
        pm.install(args[1])
    elif action == "remove":
        if len(args) < 2:
            print("Usage: pkg remove <app_name>")
            return
        pm.remove(args[1])
    else:
        print("Usage: pkg [list|install <source>|remove <app>]")
