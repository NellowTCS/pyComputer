import os
import sys


def cmd_build(path: str, output: str | None = None) -> int:
    app_dir = os.path.abspath(path)

    if not os.path.isdir(app_dir):
        print(f"Error: directory not found: {app_dir}")
        return 1

    manifest_path = os.path.join(app_dir, "manifest.json")
    if not os.path.isfile(manifest_path):
        print(f"Error: manifest.json not found in {app_dir}")
        return 1

    try:
        from pycomputersdk.pkg import Manifest, ManifestError
        import json

        manifest = Manifest.from_file(manifest_path)
    except (ManifestError, json.JSONDecodeError) as e:
        print(f"Invalid manifest: {e}")
        return 1

    app_name = manifest.data["name"]

    from pycomputersdk.pkg import bundle

    try:
        result_path, digest = bundle(app_name, output_dir=output or "dist", source_dir=app_dir)
        print(f"Build complete: {result_path}")
        return 0
    except Exception as e:
        print(f"Build failed: {e}")
        return 1
