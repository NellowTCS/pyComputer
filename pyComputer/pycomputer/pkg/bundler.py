"""
bundler.py: Build .pycapp archives from app directories.

Used by `pkg build <app_name>` for apps inside root/usr/apps/,
or directly from any directory via bundle(path=...).
"""

import hashlib
import json
import os
import zipfile

from .manifest import Manifest, ManifestError

_EXCLUDED_DIRS = frozenset({".git", "__pycache__", ".gitkeep"})
_EXCLUDED_FILES = frozenset({
    ".DS_Store", "Thumbs.db",
    "LICENSE", "TODO.md", "CHANGELOG.md", "CONTRIBUTING.md",
    ".gitignore", ".editorconfig", ".pre-commit-config.yaml",
})


def _default_apps_root():
    return os.path.normpath(
        os.path.join(os.path.dirname(__file__), "../../../data/usr/apps")
    )


def _should_include(root, name):
    path = os.path.join(root, name)
    if os.path.isdir(path):
        return name not in _EXCLUDED_DIRS and not name.startswith(".")
    return name not in _EXCLUDED_FILES and not name.startswith(".")


def bundle(app_name: str, output_dir: str = "dist", source_dir: str | None = None) -> tuple[str, str]:
    if source_dir is not None:
        app_dir = os.path.abspath(source_dir)
    else:
        app_dir = os.path.normpath(os.path.join(_default_apps_root(), app_name))

    if not os.path.isdir(app_dir):
        raise FileNotFoundError(f"app '{app_name}' not found at {app_dir}")

    manifest_path = os.path.join(app_dir, "manifest.json")
    if not os.path.isfile(manifest_path):
        raise FileNotFoundError(f"{manifest_path} not found")

    try:
        Manifest.from_file(manifest_path)
    except (ManifestError, json.JSONDecodeError) as e:
        raise ValueError(f"invalid manifest for '{app_name}': {e}")

    if output_dir.endswith(".pycapp"):
        output_path = output_dir
    else:
        output_path = os.path.join(output_dir, f"{app_name}.pycapp")
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

    with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(app_dir):
            dirs[:] = [d for d in dirs if _should_include(root, d)]
            for file in files:
                if not _should_include(root, file):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, app_dir)
                zf.write(file_path, arcname)

    sha256 = hashlib.sha256()
    with open(output_path, "rb") as f:
        sha256.update(f.read())
    digest = sha256.hexdigest()

    size = os.path.getsize(output_path)
    print(f"created: {output_path}")
    print(f"  size:     {size} bytes")
    print(f"  sha256:   {digest}")

    return output_path, digest
