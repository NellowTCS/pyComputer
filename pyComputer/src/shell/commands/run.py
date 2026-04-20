def cmd_run(shell, *args):
    if not args:
        print("Usage: run <app>")
        return
    app_name = args[0]
    shell.kernel.loader.discover_apps()
    if app_name not in shell.kernel.loader.apps:
        print(f"[run] App '{app_name}' not found.")
        return
    entry = shell.kernel.loader.import_entrypoint(app_name)
    if entry:
        entry(*args[1:])
    else:
        print(f"[run] Failed to launch '{app_name}'.")
