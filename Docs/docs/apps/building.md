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

Use the SDK CLI to run an app directly:

```bash
pycomp run /path/to/myapp
```

Or inside pyComputer:

```bash
cd pyComputer/pyComputer
uv run python main.py
[/] $ pkg install /path/to/myapp
[/] $ run myapp
```

### Testing

The SDK provides test utilities in `pycomputersdk.testing`:

```python
from pycomputersdk.testing import MockRenderer, MockInput, assert_screen

def test_my_app():
    mock = MockRenderer()
    mock.write("Hello")
    assert mock.capture() == "Hello"
```

Run tests with `pycomp test`:

```bash
pycomp test .                           # run all tests
pycomp test . -v                        # verbose mode
pycomp test . -- tests/test_main.py     # specific test file
```

The `pycomp init` scaffold creates a `tests/test_main.py` with `MockRenderer` and `MockInput` already wired up.

### CLI Workflow

The `pycomp` CLI provides a full development workflow:

```bash
pycomp init myapp              # Scaffold a new app project
cd myapp
pycomp validate .              # Validate the manifest
pycomp run .                   # Run the app in kernel environment
pycomp test .                  # Run tests
pycomp build .                 # Build .pycapp archive
```

### Packaging

Use `pycomp build` to create a `.pycapp` archive:

```bash
pycomp build .
```

Or inside pyComputer:

```bash
[/] $ pkg build myapp
```

Or use the Python API directly:

```python
from pycomputersdk.pkg import bundle
result_path, digest = bundle("myapp", source_dir="/path/to/myapp")
```

The `.pycapp` is a ZIP file containing all app files plus `manifest.json`. The build command prints a SHA-256 hash for integrity verification.
