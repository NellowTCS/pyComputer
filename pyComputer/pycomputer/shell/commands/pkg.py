def cmd_pkg(shell, *args):
    import os
    from pycomputer.pkg.manager import PackageManager
    from pycomputer.pkg.bundler import bundle

    pm = PackageManager()
    if not args:
        pm.list()
        return

    action = args[0]

    if action == "list":
        pm.list()

    elif action == "install":
        if len(args) < 2:
            print("Usage: pkg install <path>          local directory")
            print("       pkg install <url>            .pycapp URL")
            print("       pkg install <name>           from registry")
            return
        force = "--force" in args
        targets = [a for a in args[1:] if not a.startswith("--")]
        target = targets[0] if targets else None
        if target is None:
            print("[pkg] Specify an app.")
            return
        if target.startswith("http://") or target.startswith("https://"):
            pm.install_from_url(target)
        elif target.endswith(".pycapp"):
            print(f"[pkg] Installing from {target} ...")
            result = pm._extract_pycapp(target, force=force)
            if result:
                print(f"[pkg] Installed '{result}'.")
        elif target.startswith("/") or target.startswith("./") or target.startswith("..") or target.startswith("~"):
            pm.install(target)
        elif os.path.isdir(target):
            pm.install(target)
        else:
            pm.install_remote(target)

    elif action == "remove":
        if len(args) < 2:
            print("Usage: pkg remove <app_name>")
            return
        pm.remove(args[1])

    elif action == "search":
        term = args[1] if len(args) > 1 else None
        pm.search_registry(term)

    elif action == "registry":
        url = args[1] if len(args) > 1 else None
        pm.set_registry_url(url)

    elif action == "build":
        if len(args) < 2:
            print("Usage: pkg build <app_name> [--source <path>]")
            return
        app_name = args[1]
        source_dir = None
        if "--source" in args:
            idx = args.index("--source")
            if idx + 1 < len(args):
                source_dir = args[idx + 1]
        try:
            bundle(app_name, source_dir=source_dir)
        except (FileNotFoundError, ValueError) as e:
            print(f"[pkg] ERROR: {e}")

    else:
        print("Usage: pkg [list|install|remove|search|registry|build]")
        print("  pkg list                          show installed apps")
        print("  pkg install <path|url|name>       install an app")
        print("  pkg remove <name>                 uninstall an app")
        print("  pkg search [term]                 browse registry")
        print("  pkg registry [url]                show/set registry URL")
        print("  pkg build <name> [--source <path>]  build .pycapp")
