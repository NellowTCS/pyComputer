---
title: "Package Manager"
description: "The pkg command reference"
---

## Package Manager

`pkg` is the built-in package manager for installing, removing, building, and searching apps.

### Usage

```bash
pkg list                          show installed apps
pkg install <path|url|name>       install an app
pkg remove <name>                 uninstall an app
pkg search [term]                 browse registry
pkg registry [url]                show/set registry URL
pkg build <name> [--source <path>] build .pycapp
```

### `pkg list`

Lists all currently installed apps.

```bash
[/] $ pkg list
[pkg] Installed apps:
  calculator
  notes
  settings
  snake
```

### `pkg install`

Install from a local directory:

```bash
[/] $ pkg install /path/to/myapp
```

Install from a `.pycapp` file:

```bash
[/] $ pkg install app.pycapp
[/] $ pkg install --force app.pycapp   # overwrite existing
```

Install from a URL:

```bash
[/] $ pkg install https://example.com/app.pycapp
```

Install from the registry:

```bash
[/] $ pkg install glyphformer
```

### `pkg remove`

Uninstall an app.

```bash
[/] $ pkg remove myapp
```

### `pkg search`

Search the app registry.

```bash
[/] $ pkg search
[/] $ pkg search glyph
```

### `pkg registry`

View or set the registry URL.

```bash
[/] $ pkg registry
[pkg] Registry URL: https://raw.githubusercontent.com/.../apps-index.json
[/] $ pkg registry https://example.com/custom-registry.json
```

### `pkg build`

Build a `.pycapp` archive from an installed app or source directory.

```bash
[/] $ pkg build myapp
[/] $ pkg build myapp --source /path/to/myapp
```
