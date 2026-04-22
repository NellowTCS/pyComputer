"""
Registry subsystem: stores installed apps list, persists to /sys/apps.json.
"""

import json
import os


from src.fs.vfs import VFS


class Registry:
    def __init__(self, registry_path=None):
        self.vfs = VFS()
        if registry_path is None:
            self.registry_path = self.vfs.abspath("sys/apps.json")
        else:
            self.registry_path = self.vfs.abspath(registry_path)
        # Ensure the registry directory exists
        import os

        reg_dir = os.path.dirname(self.registry_path)
        if not self.vfs.exists(reg_dir):
            self.vfs.mkdir(reg_dir)
        self.apps = []
        self.load()

    def load(self):
        try:
            with open(self.registry_path) as f:
                self.apps = json.load(f)
        except FileNotFoundError:
            self.apps = []
            # Ensure the file is created even if empty
            self.save()

    def save(self):
        with open(self.registry_path, "w") as f:
            json.dump(self.apps, f)

    def add_app(self, app_name):
        if app_name not in self.apps:
            self.apps.append(app_name)
            self.save()

    def remove_app(self, app_name):
        if app_name in self.apps:
            self.apps.remove(app_name)
            self.save()
