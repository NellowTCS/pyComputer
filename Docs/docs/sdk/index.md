---
title: "SDK Reference"
description: "pyComputer SDK reference"
---

## SDK Reference

The `pycomputersdk` package provides the public API for building pyComputer apps. It re-exports from `pycomputer.*` modules.

### Installation

```bash
cd pyComputerSDK
uv pip install -e .
```

Or from PyPI:

```bash
uv pip install pycomputersdk
```

### Package Structure

```text
pycomputersdk/
  __init__.py    - Renderer, Key, VFS, utility exports
  std.py         - Standard library (input, info, error, etc.)
  fs.py          - VFS re-export
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
