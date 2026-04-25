"""
manager.py: Install/update/remove apps from URL or local file
"""

import os
import shutil
from ..fs.vfs import VFS
from ..kernel.registry import Registry
from .manifest import Manifest, ManifestError


class PackageManager:
    def __init__(self, apps_path=None):
        self.vfs = VFS()
        if apps_path is None:
            self.apps_path = self.vfs.abspath("usr/apps")
        else:
            self.apps_path = self.vfs.abspath(apps_path)
        self.registry = Registry()

    def install(self, source):
        # For now, source is a path to a local app directory
        app_name = os.path.basename(source.rstrip("/"))
        dest = os.path.join(self.apps_path, app_name)
        manifest_path = os.path.join(source, "manifest.json")
        if not os.path.exists(manifest_path):
            print(f"[pkg] ERROR: manifest.json missing in '{app_name}'.")
            return
        try:
            Manifest.from_file(manifest_path)
        except ManifestError as e:
            print(f"[pkg] ERROR: Invalid manifest for '{app_name}': {e}")
            return
        if os.path.exists(dest):
            print(f"[pkg] App '{app_name}' already installed.")
            return
        shutil.copytree(source, dest)
        self.registry.add_app(app_name)
        print(f"[pkg] Installed '{app_name}'.")

    def remove(self, app_name):
        dest = os.path.join(self.apps_path, app_name)
        if not os.path.exists(dest):
            print(f"[pkg] App '{app_name}' not found.")
            return
        shutil.rmtree(dest)
        self.registry.remove_app(app_name)
        print(f"[pkg] Removed '{app_name}'.")

    def list(self):
        self.registry.load()
        print("[pkg] Installed apps:")
        for app in self.registry.apps:
            print(f"  {app}")
