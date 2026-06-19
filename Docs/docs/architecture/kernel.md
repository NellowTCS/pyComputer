---
title: "Kernel"
description: "pyComputer kernel architecture"
---

## Kernel

The kernel is the central coordinator. It owns all subsystems and manages the event loop.

### Components

| Component   | Responsibility                                        |
|-------------|-------------------------------------------------------|
| `Kernel`    | Orchestrator, creates subsystems, runs event loop     |
| `Scheduler` | Async task scheduler based on `asyncio`               |
| `IO`        | I/O multiplexing                                      |
| `Loader`    | App discovery, manifest loading, dynamic imports      |
| `Registry`  | Installed app database (persisted to `sys/apps.json`) |

### Loader

The loader discovers apps by scanning `usr/apps/` for directories containing `manifest.json`. It uses `importlib` to dynamically import app entry points, temporarily adding the app directory to `sys.path`.

```text
discover_apps() → scan usr/apps/ for manifest.json files
import_entrypoint(name) → read manifest, load main.py, return main()
import_from_path(path) → load app from any directory
```

### Registry

The registry tracks installed apps in `sys/apps.json`. It is a simple JSON array of app names.

```json
["calculator", "notes", "glyphformer"]
```
