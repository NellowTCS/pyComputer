# pyComputerSDK

Build standalone apps for pyComputer without running inside the virtual machine.

## Overview

**pyComputerSDK** is a Python library that re-exports pyComputer's UI rendering, input handling, filesystem, networking, and utility modules so you can develop and test pyComputer apps as regular Python programs on your host machine. Once your app is ready, package it as a `.pycapp` bundle for distribution.

## Features

- **Renderer**: Terminal-based UI rendering with ANSI escape codes, colors, bold/dim, cursor control
- **Input**: Raw keyboard input with arrow keys, escape sequences, and web queue support
- **Dialog**: TUI dialog boxes for confirmations, prompts, and messages
- **Theming**: Color themes with foreground, background, and style presets
- **std module**: High-level app utilities (`input`, `info`, `clear`, `confirm`, `spinner`, `table`, etc.)
- **Async Tools**: Debounce, throttle, background tasks, async queue
- **Filesystem**: Virtual filesystem (VFS) access
- **HTTP Client**: Simple HTTP requests
- **Package Management**: Manifest validation and `.pycapp` bundling
- **Testing**: MockRenderer for unit testing apps without a terminal

## Quick Start

```python
from pycomputersdk import Renderer, get_key, Key, setup_raw, restore, cleanup
from pycomputersdk.std import info, input, confirm

r = Renderer()
old = setup_raw()

r.move(10, 5).write("Hello from pyComputerSDK!").flush()

name = input("What is your name? ")
info(f"Hello, {name}!")

restore(old)
cleanup()
```

## Installation

pyComputerSDK is bundled with pyComputer. To use it in a standalone project:

```bash
pip install pycomputersdk
```

Or add it to your `pyproject.toml`:

```toml
dependencies = ["pycomputersdk"]
```

## Module Reference

| Module                      | Import                                           | Contents                                                                                                                                                                                                                                                   |
|-----------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pycomputersdk`             | `from pycomputersdk import ...`                  | Renderer, get_key, Key, Dialog, Theme, Color, Bg, Style, Preset, setup_raw, restore, cleanup, is_web, is_native                                                                                                                                            |
| `pycomputersdk.std`         | `from pycomputersdk.std import ...`              | input, info, error, success, warning, confirm, pause, section, subsection, banner, table, spinner, step, clear, clear_line, hide_cursor, show_cursor, bold, dim, green, red, yellow, cyan, box, box_at, print_exception, sleep, get_env, set_env, app_exit |
| `pycomputersdk.async_utils` | `from pycomputersdk.async_utils import ...`      | debounce, throttle, with_timeout, BackgroundTask, run_in_background, synced, AsyncQueue                                                                                                                                                                    |
| `pycomputersdk.fs`          | `from pycomputersdk.fs import VFS`               | Virtual filesystem access                                                                                                                                                                                                                                  |
| `pycomputersdk.net`         | `from pycomputersdk.net import HTTP`             | HTTP client                                                                                                                                                                                                                                                |
| `pycomputersdk.pkg`         | `from pycomputersdk.pkg import ...`              | Manifest, ManifestError, bundle                                                                                                                                                                                                                            |
| `pycomputersdk.testing`     | `from pycomputersdk.testing import MockRenderer` | Terminal-less renderer for unit tests                                                                                                                                                                                                                      |

## Web Support

The SDK detects the web platform via `is_web()` and adapts automatically:

- `setup_raw()` calls browser raw input mode via JavaScript interop
- `get_key()` reads from an input queue populated by the browser
- Renderer output goes to the terminal emulator in the browser

No code changes are needed between native and web runs.

## Packaging Apps

Bundle your app into a `.pycapp` archive for distribution:

```python
from pycomputersdk.pkg import bundle, Manifest

manifest = Manifest(
    name="myapp",
    version="0.1.0",
    entry="main.py",
    description="My pyComputer app",
    permissions=[],
)
bundle("myapp", source_dir="./myapp", manifest=manifest)
```

Or from inside pyComputer:

```bash
pkg build myapp --source /path/to/myapp
```

## Example

See the [Glyphformer](https://github.com/NellowTCS/Glyphformer) repo for a complete game built with pyComputerSDK.

## License

MIT
