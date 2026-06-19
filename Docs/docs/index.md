---
title: "pyComputer"
description: "A virtual computer in your terminal."
---

::: hero layout:split glow:true

# pyComputer

A virtual computer in your terminal.

::: tag "Virtual"
::: tag "Extensible"
::: tag "Python"

::: button "Quick Start" ./getting-started/quickstart.md icon:play
<!-- markdownlint-disable MD034 -->
::: button "GitHub" external:https://github.com/NellowTCS/pyComputer icon:github

== side

::: card "What is pyComputer?"
pyComputer is a virtual computer that runs in your terminal. It boots, provides a shell, runs apps, and exposes an SDK for building your own terminal applications in Python. Runs natively on macOS, Linux, Windows, or in the browser via WebAssembly.
:::
:::

## Features

::: grids
::: grid
::: card "Shell Environment" icon:terminal
A fully functional shell with command history, autocomplete, and built-in commands. Navigate, edit files, install apps.
:::
:::

::: grid
::: card "Package System" icon:package
Install apps from local directories, remote URLs, or a registry. `.pycapp` archives bundle everything into a single deployable file.
:::
:::

::: grid
::: card "Full TUI Rendering" icon:monitor
Double-buffered terminal rendering with themes, palettes, and full unicode box-drawing. Powered by the `tuiro` engine.
:::
:::

::: grid
::: card "Python SDK" icon:code
Build standalone apps using the `pycomputersdk` package. Renderer, input handling, filesystem, dialogs, everything you need!
:::
:::

::: grid
::: card "Virtual Filesystem" icon:folder
A mounted data disk with read-only golden master. Apps see a unified VFS that maps to real files on disk.
:::
:::

::: grid
::: card "Web Demo" icon:globe
Run pyComputer in the browser via Pyodide + xterm.js. Same kernel, same shell, same apps and no install required.
:::
:::
:::

## Quick Example

```python
from pycomputersdk import Renderer, get_key
from pycomputersdk.std import input, info

r = Renderer()
r.clear()
name = input("What is your name? ")
info(f"Hello, {name}!")
```

## Installation

```bash
git clone https://github.com/NellowTCS/pyComputer
cd pyComputer/pyComputer
uv run python main.py
```

Or try the [web demo](https://nisoku.org/pyComputer) without installing anything.

## Next Steps

::: grids
::: grid

### Getting Started

New to pyComputer? Start here.

::: button "Quick Start" ./getting-started/quickstart.md icon:play
::: button "Installation" ./getting-started/installation.md icon:download
:::
::: grid

### Build Apps

Create your own pyComputer applications.

::: button "SDK Reference" ./sdk/ icon:code
::: button "Building Apps" ./apps/building.md icon:package
:::
::: grid

### Reference

Browse the full documentation.

::: button "Shell Commands" ./shell/ icon:terminal
::: button "Architecture" ./architecture/ icon:git-commit
:::
:::
