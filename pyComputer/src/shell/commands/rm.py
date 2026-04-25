import os
from src.fs.vfs import VFS
from src.stdlib.appstdlib import confirm


def _load_settings():
    try:
        import json
        settings_path = os.path.join(os.path.dirname(__file__), "../../../root/apps/settings/config.json")
        if os.path.exists(settings_path):
            with open(settings_path) as f:
                return json.load(f)
    except:
        pass
    return {}


def cmd_rm(shell, *args):
    if not args:
        print("Usage: rm [-r] <file>")
        return
    
    recursive = False
    paths = []
    for arg in args:
        if arg == "-r":
            recursive = True
        else:
            paths.append(arg)
    
    if not paths:
        print("Usage: rm [-r] <file>")
        return
    
    settings = _load_settings()
    vfs = VFS()
    
    for path in paths:
        try:
            if not vfs.exists(path):
                print(f"[rm] File not found: {path}")
                continue
            
            if recursive or os.path.isdir(vfs.abspath(path)):
                if settings.get("confirm_actions"):
                    if not confirm(f"Remove {path} and contents? [y/N] "):
                        print(f"[rm] Skipped: {path}")
                        continue
                vfs.remove(path)
                print(f"[rm] Removed: {path}")
            else:
                if settings.get("confirm_actions"):
                    if not confirm(f"Remove {path}? [y/N] "):
                        print(f"[rm] Skipped: {path}")
                        continue
                vfs.remove(path)
                print(f"[rm] Removed: {path}")
        except Exception as e:
            print(f"[rm] {e}")