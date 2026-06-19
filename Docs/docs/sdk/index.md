---
title: "SDK Reference"
description: "pyComputer SDK reference"
---

## SDK Reference

The `pycomputersdk` package provides the public API for building pyComputer apps. It re-exports from `pycomputer.*` modules and includes a CLI tool for scaffolding, building, running, and testing apps.

### Installation

Clone the repo and install with uv:

```bash
git clone https://github.com/NellowTCS/pyComputer
cd pyComputer/pyComputerSDK
uv pip install -e .
```

Or from PyPI:

```bash
uv pip install pycomputersdk
```

Or with pip:

```bash
cd pyComputerSDK
pip install -e .
```

### Package Structure

```text
pycomputersdk/
  __init__.py    - Renderer, Key, VFS, utility exports
  std.py         - Standard library (input, info, error, etc.)
  fs.py          - VFS re-export
  logging.py     - Logger, Level, level functions
  net.py         - HTTP client
  pkg.py         - Manifest, bundle, ManifestError
  testing.py     - MockRenderer, MockInput, assert_screen
  async_utils.py - debounce, throttle, with_timeout, BackgroundTask, etc.
  cli/
    main.py           - pycomp CLI entry point
    commands/
      init.py         - Scaffold a new app project
      build.py        - Build a .pycapp archive
      validate.py     - Validate app manifest
      test.py         - Run app tests with pytest
      run.py          - Run an app in a full kernel environment
  root/               - Template root filesystem (logo, apps.json, motd)
```

### CLI Tool

The SDK provides the `pycomp` CLI for app development:

```bash
pycomp init myapp           # Scaffold a new app
pycomp validate .           # Validate app manifest
pycomp run .                # Run app in kernel environment
pycomp build .              # Build .pycapp archive
pycomp test .               # Run app tests
```

### Workspace

The repo uses a uv workspace with two members, managed by the root `pyproject.toml`:

```toml
[tool.uv.workspace]
members = ["pyComputer", "pyComputerSDK"]
```

### Quick Example

```python
from pycomputersdk import Renderer, get_key, Key
from pycomputersdk.std import input, info, success, confirm

r = Renderer()
r.clear()
r.banner("Hello World")
name = input("Name: ")
info(f"Hello, {name}!")
```
