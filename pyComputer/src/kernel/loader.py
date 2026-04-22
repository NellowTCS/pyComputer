"""
Loader subsystem: discovers apps, loads manifests, imports entrypoints dynamically.
"""

import importlib.util
import os
import json
import sys
from src.fs.vfs import VFS


class Loader:
    def __init__(self, apps_path=None):
        self.vfs = VFS()
        if apps_path is None:
            self.apps_path = self.vfs.abspath("usr/apps")
        else:
            self.apps_path = self.vfs.abspath(apps_path)
        self.apps = []

    def discover_apps(self):
        self.apps = []
        if not os.path.isdir(self.apps_path):
            print(f"[loader] Apps path not found: {self.apps_path}")
            return
        for name in os.listdir(self.apps_path):
            app_dir = os.path.join(self.apps_path, name)
            if os.path.isdir(app_dir) and os.path.isfile(
                os.path.join(app_dir, "manifest.json")
            ):
                self.apps.append(name)

    def load_manifest(self, app_name):
        manifest_path = os.path.join(self.apps_path, app_name, "manifest.json")
        try:
            with open(manifest_path) as f:
                return json.load(f)
        except FileNotFoundError:
            return None

    def import_entrypoint(self, app_name):
        app_dir = os.path.join(self.apps_path, app_name)
        manifest = self.load_manifest(app_name)
        if not manifest:
            print(f"[loader] Manifest not found for app '{app_name}'")
            return None
        entry = manifest.get("entry", "main.py")
        entry_path = os.path.join(app_dir, entry)
        if not os.path.isfile(entry_path):
            print(f"[loader] Entrypoint '{entry}' not found for app '{app_name}'")
            return None
        # Ensure pyComputer/src and app_dir are in sys.path for import
        src_path = os.path.join(os.path.dirname(self.apps_path), "../../pyComputer/src")
        src_path = os.path.normpath(src_path)
        sys.path.insert(0, src_path)
        sys.path.insert(0, app_dir)
        spec = importlib.util.spec_from_file_location(f"{app_name}_main", entry_path)
        if spec is None or spec.loader is None:
            print(f"[loader] Failed to create import spec for app '{app_name}'")
            sys.path.pop(0)
            return None
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
            sys.path.pop(0)
            return getattr(module, "main", None)
        except Exception as e:
            sys.path.pop(0)
            print(f"[loader] Failed to import app '{app_name}': {e}")
            return None
