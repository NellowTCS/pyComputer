"""
Registry subsystem: stores installed apps list, persists to /sys/apps.json.
"""

import json
import os

class Registry:
    def __init__(self, registry_path="/sys/apps.json"):
        self.registry_path = registry_path
        self.apps = []
        self.load()

    def load(self):
        try:
            with open(self.registry_path) as f:
                self.apps = json.load(f)
        except FileNotFoundError:
            self.apps = []

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
