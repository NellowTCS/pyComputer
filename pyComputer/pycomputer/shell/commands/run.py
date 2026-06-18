import os


def cmd_run(shell, *args):
    if not args:
        print("Usage: run <app>          installed app")
        print("       run <path>         app from any directory")
        return

    target = args[0]

    # Absolute, relative, or home-relative path => load from path
    if target.startswith("/") or target.startswith("./") or target.startswith("..") or target.startswith("~"):
        path = os.path.expanduser(target)
        entry = shell.kernel.loader.import_from_path(path)
    else:
        # Try installed app
        shell.kernel.loader.discover_apps()
        if target not in shell.kernel.loader.apps:
            print(f"[run] App '{target}' not found.")
            return
        entry = shell.kernel.loader.import_entrypoint(target)

    if not entry or not callable(entry):
        print(f"[run] Failed to launch '{target}'.")
        return
    try:
        entry(*args[1:])
    except SystemExit:
        raise
    except Exception as e:
        print(f"[run] Error running '{target}': {e}")
