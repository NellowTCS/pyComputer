import os
import json


def cmd_validate(path: str) -> int:
    app_dir = os.path.abspath(path)
    manifest_path = os.path.join(app_dir, "manifest.json")

    if not os.path.isdir(app_dir):
        print(f"Error: directory not found: {app_dir}")
        return 1

    if not os.path.isfile(manifest_path):
        print(f"Error: manifest.json not found in {app_dir}")
        return 1

    try:
        from pycomputersdk.pkg import Manifest, ManifestError

        manifest = Manifest.from_file(manifest_path)
        print(f"Valid manifest for '{manifest.data.get('name', '?')}'")
        print(f"  version:     {manifest.data.get('version', '?')}")
        print(f"  entry:       {manifest.data.get('entry', '?')}")
        print(f"  permissions: {', '.join(manifest.data.get('permissions', [])) or 'none'}")
        print(f"  description: {manifest.data.get('description', '(no description)')}")

        entry_path = os.path.join(app_dir, manifest.data["entry"])
        if not os.path.isfile(entry_path):
            print(f"  Warning: entry '{manifest.data['entry']}' not found (expected at {entry_path})")
        else:
            print("  entry file:  ok")

        return 0

    except (ManifestError, json.JSONDecodeError) as e:
        print(f"Invalid manifest: {e}")
        return 1
