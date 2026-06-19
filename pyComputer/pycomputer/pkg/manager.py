"""
manager.py: Install/update/remove apps from URL or local file
"""

import json
import os
import shutil
import tempfile
import zipfile
from ..fs.vfs import VFS
from ..kernel.registry import Registry
from ..net.http import HTTP
from .manifest import Manifest, ManifestError


REGISTRY_CONF_PATH = "sys/registry.json"
_DEFAULT_REGISTRY = "https://raw.githubusercontent.com/NellowTCS/pyComputer/main/root/sys/apps-index.json"


class PackageManager:
    def __init__(self, apps_path=None):
        self.vfs = VFS()
        if apps_path is None:
            self.apps_path = self.vfs.abspath("usr/apps")
        else:
            self.apps_path = self.vfs.abspath(apps_path)
        self.registry = Registry()
        self.http = HTTP()

    def install(self, source):
        app_name = os.path.basename(source.rstrip("/"))
        dest = os.path.join(self.apps_path, app_name)
        manifest_path = os.path.join(source, "manifest.json")
        if not os.path.exists(manifest_path):
            print(f"[pkg] ERROR: manifest.json missing in '{app_name}'.")
            return
        try:
            Manifest.from_file(manifest_path)
        except (ManifestError, json.JSONDecodeError) as e:
            print(f"[pkg] ERROR: Invalid manifest for '{app_name}': {e}")
            return
        if os.path.exists(dest):
            print(f"[pkg] App '{app_name}' already installed.")
            return
        shutil.copytree(source, dest)
        self.registry.add_app(app_name)
        print(f"[pkg] Installed '{app_name}'.")

    def install_from_url(self, url):
        if not url.startswith("https://"):
            print("[pkg] ERROR: Only HTTPS URLs are allowed.")
            return
        tmpdir = tempfile.mkdtemp(prefix="pycapp_")
        try:
            tmp_path = os.path.join(tmpdir, "package.pycapp")
            print(f"[pkg] Downloading {url} ...")
            data = self.http.get_bytes(url)
            if data is None:
                print(f"[pkg] ERROR: Failed to download {url}.")
                return
            with open(tmp_path, "wb") as f:
                f.write(data)

            app_name = self._extract_pycapp(tmp_path)
            if app_name:
                print(f"[pkg] Installed '{app_name}' from URL.")
        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

    def install_remote(self, name):
        registry_url = self._get_registry_url()
        print(f"[pkg] Fetching registry from {registry_url} ...")
        data = self.http.get_json(registry_url)
        if data is None:
            print("[pkg] ERROR: Could not fetch registry.")
            return

        apps = data.get("apps", {})
        entry = apps.get(name)
        if entry is None:
            matches = [k for k in apps if name.lower() in k.lower()]
            if matches:
                print(f"[pkg] App '{name}' not found. Did you mean:")
                for m in matches:
                    desc = apps[m].get("description", "")
                    print(f"      {m}  - {desc}")
            else:
                print(f"[pkg] App '{name}' not found in registry.")
            return

        url = entry.get("url")
        if not url:
            print(f"[pkg] ERROR: No download URL for '{name}'.")
            return

        self.install_from_url(url)

    def _extract_pycapp(self, pycapp_path, force=False):
        dest_name = None
        with zipfile.ZipFile(pycapp_path, "r") as zf:
            names = zf.namelist()
            if "manifest.json" not in names:
                print("[pkg] ERROR: .pycapp does not contain manifest.json.")
                return None

            manifest_data = json.loads(zf.read("manifest.json"))
            try:
                manifest = Manifest(manifest_data)
            except (ManifestError, json.JSONDecodeError) as e:
                print(f"[pkg] ERROR: Invalid manifest in .pycapp: {e}")
                return None

            dest_name = manifest.get("name")
            if not dest_name or "/" in dest_name or ".." in dest_name:
                print("[pkg] ERROR: Invalid app name in manifest.")
                return None
            dest = os.path.join(self.apps_path, dest_name)
            if os.path.exists(dest):
                if not force:
                    print(f"[pkg] App '{dest_name}' already installed. Use --force to overwrite.")
                    return None
                shutil.rmtree(dest)

            os.makedirs(dest, exist_ok=True)
            for name in names:
                if name.endswith("/"):
                    os.makedirs(os.path.join(dest, name), exist_ok=True)
                else:
                    out_path = os.path.join(dest, name)
                    resolved = os.path.normpath(out_path)
                    if not resolved.startswith(os.path.normpath(dest) + os.sep):
                        print(f"[pkg] WARNING: Skipping path traversal entry: {name}")
                        continue
                    os.makedirs(os.path.dirname(out_path), exist_ok=True)
                    with zf.open(name) as src, open(out_path, "wb") as dst:
                        dst.write(src.read())

        self.registry.add_app(dest_name)
        return dest_name

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

    def search_registry(self, term=None):
        registry_url = self._get_registry_url()
        print(f"[pkg] Fetching registry from {registry_url} ...")
        data = self.http.get_json(registry_url)
        if data is None:
            print("[pkg] ERROR: Could not fetch registry.")
            return

        apps = data.get("apps", {})
        if not apps:
            print("[pkg] Registry is empty.")
            return

        filtered = []
        for name, info in apps.items():
            if term is None or term.lower() in name.lower() or term.lower() in info.get("description", "").lower():
                filtered.append((name, info))

        if not filtered:
            print(f"[pkg] No apps match '{term}'.")
            return

        print(f"[pkg] Available apps ({len(filtered)}):")
        for name, info in sorted(filtered):
            ver = info.get("version", "?")
            desc = info.get("description", "")
            print(f"  {name:<20} {ver:<10} {desc}")

    def _get_registry_url(self):
        conf_path = self.vfs.abspath(REGISTRY_CONF_PATH)
        try:
            with open(conf_path) as f:
                conf = json.load(f)
                return conf.get("url", _DEFAULT_REGISTRY)
        except (FileNotFoundError, json.JSONDecodeError):
            return _DEFAULT_REGISTRY

    def set_registry_url(self, url):
        if not url:
            conf_path = self.vfs.abspath(REGISTRY_CONF_PATH)
            try:
                with open(conf_path) as f:
                    conf = json.load(f)
                current = conf.get("url", _DEFAULT_REGISTRY)
            except (FileNotFoundError, json.JSONDecodeError):
                current = _DEFAULT_REGISTRY
            print(f"[pkg] Registry URL: {current}")
            return

        conf_path = self.vfs.abspath(REGISTRY_CONF_PATH)
        os.makedirs(os.path.dirname(conf_path), exist_ok=True)
        with open(conf_path, "w") as f:
            json.dump({"url": url, "updated": None}, f)
        print(f"[pkg] Registry URL set to: {url}")
