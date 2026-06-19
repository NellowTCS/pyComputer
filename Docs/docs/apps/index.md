---
title: "Apps"
description: "Overview of pyComputer's app system"
---

## Apps

pyComputer apps are Python programs that run inside the virtual computer. They use the SDK to render TUI output, handle keyboard input, and access the filesystem.

### How Apps Work

1. An app is a directory with a `manifest.json` and at least one Python file
2. The manifest declares metadata (name, version, entry point, permissions)
3. The entry point exports a `main()` function
4. The shell's `run` command loads the app, calls `main()`, and passes any arguments
5. Apps import from `pycomputersdk` to interact with pyComputer

### Built-in Apps

pyComputer ships with several pre-installed apps in `root/usr/apps/`:

- **calculator** - math expression evaluator
- **notes** - text note manager
- **settings** - theme and user preferences
- **snake** - classic snake game
- **matrix** - terminal rain animation
- **ide** - full TUI code editor
