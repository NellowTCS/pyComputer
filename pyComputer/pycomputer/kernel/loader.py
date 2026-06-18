"""
Loader subsystem: discovers apps, loads manifests, imports entrypoints dynamically.
"""

import importlib.util
import os
import json
import sys
from pycomputer.fs.vfs import VFS


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
        added = None
        if app_dir not in sys.path:
            sys.path.insert(0, app_dir)
            added = app_dir
        spec = importlib.util.spec_from_file_location(f"{app_name}_main", entry_path)
        if spec is None or spec.loader is None:
            print(f"[loader] Failed to create import spec for app '{app_name}'")
            if added is not None:
                sys.path.remove(added)
            return None
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
            if added is not None:
                sys.path.remove(added)
            return getattr(module, "main", None)
        except Exception as e:
            if added is not None:
                sys.path.remove(added)
            print(f"[loader] Failed to import app '{app_name}': {e}")
            return None

    def import_from_path(self, path):
        app_dir = os.path.abspath(path)
        manifest_path = os.path.join(app_dir, "manifest.json")
        if not os.path.isfile(manifest_path):
            print(f"[loader] manifest.json not found at {app_dir}")
            return None
        try:
            with open(manifest_path) as f:
                manifest = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"[loader] Failed to read manifest: {e}")
            return None
        entry = manifest.get("entry", "main.py")
        entry_path = os.path.join(app_dir, entry)
        if not os.path.isfile(entry_path):
            print(f"[loader] Entrypoint '{entry}' not found at {app_dir}")
            return None
        app_name = manifest.get("name", os.path.basename(app_dir))
        added = None
        if app_dir not in sys.path:
            sys.path.insert(0, app_dir)
            added = app_dir
        spec = importlib.util.spec_from_file_location(f"{app_name}_main", entry_path)
        if spec is None or spec.loader is None:
            print(f"[loader] Failed to create import spec for '{app_name}'")
            if added is not None:
                sys.path.remove(added)
            return None
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
            if added is not None:
                sys.path.remove(added)
            return getattr(module, "main", None)
        except Exception as e:
            if added is not None:
                sys.path.remove(added)
            print(f"[loader] Failed to import '{app_name}' from {app_dir}: {e}")
            return None
