"""
Loader subsystem: discovers apps, loads manifests, imports entrypoints dynamically.
"""

import importlib
import os
import json

class Loader:
    def __init__(self, apps_path="/usr/apps/"):
        self.apps_path = apps_path
        self.apps = []

    def discover_apps(self):
        # Placeholder: scan apps_path for apps
        self.apps = []  # Would list directories in apps_path

    def load_manifest(self, app_name):
        manifest_path = os.path.join(self.apps_path, app_name, "manifest.json")
        try:
            with open(manifest_path) as f:
                return json.load(f)
        except FileNotFoundError:
            return None

    def import_entrypoint(self, app_name, entry="main.py"):
        # Placeholder for dynamic import
        pass
