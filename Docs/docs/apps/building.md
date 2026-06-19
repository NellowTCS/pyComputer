---
title: "Building Apps"
description: "How to create a pyComputer application"
---

## Building Apps

### Project Structure

An app is a directory with this structure:

```text
myapp/
  manifest.json
  main.py
  ...
```

### Manifest Format

```json
{
  "name": "myapp",
  "version": "0.1.0",
  "entry": "main.py",
  "permissions": ["fs"],
  "description": "My awesome app."
}
```

Fields:

- `name` - unique identifier (used by `pkg install` and `run`)
- `version` - semver string
- `entry` - Python file to load (relative to app directory)
- `permissions` - list of permissions (`"fs"` for filesystem access)
- `description` - human-readable summary

### Entry Point

The entry point file must export a `main()` function:

```python
from pycomputersdk import Renderer
from pycomputersdk.std import input, info, error

r = Renderer()

def main(*args):
    r.clear()
    r.banner("My App")
    name = input("Enter your name: ")
    if name:
        info(f"Hello, {name}!")
    else:
        error("No name entered.")
```

### Testing Locally

```bash
cd pyComputer/pyComputer
uv run python main.py
```

Then inside pyComputer:

```bash
[/] $ pkg install /path/to/myapp
[/] $ run myapp
```

### Packaging

Use `pkg build` to create a `.pycapp` archive:

```bash
[/] $ pkg build myapp
```

Or use the standalone build script:

```bash
python scripts/build.py /path/to/myapp
```

The `.pycapp` is a ZIP file containing all app files plus `manifest.json`.
