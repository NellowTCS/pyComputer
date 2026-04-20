def cmd_ls(shell, *args):
    import os
    shell.kernel.loader.discover_apps()
    if args:
        app_name = args[0]
        if app_name in shell.kernel.loader.apps:
            manifest = shell.kernel.loader.load_manifest(app_name)
            if manifest:
                print(f"[ls] App: {manifest.get('name')}")
                print(f"  Version: {manifest.get('version')}")
                print(f"  Description: {manifest.get('description')}")
                print(f"  Entry: {manifest.get('entry')}")
                print(f"  Permissions: {', '.join(manifest.get('permissions', []))}")
            else:
                print(f"[ls] No manifest found for app '{app_name}'.")
        else:
            print(f"[ls] App '{app_name}' not found.")
        return
    print("[ls] Available apps:")
    for app in shell.kernel.loader.apps:
        print(f"  {app}")
    print("[ls] Files in current directory:")
    for f in os.listdir(os.getcwd()):
        print(f"  {f}")
