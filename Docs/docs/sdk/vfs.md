---
title: "Virtual Filesystem"
description: "VFS SDK reference"
---

## Virtual Filesystem

```python
from pycomputersdk.fs import VFS
```

The VFS provides filesystem access from within apps. It maps VFS paths to real paths under the data disk.

### Constructor

```python
VFS()
```

The root is automatically determined from the environment (data dir for native, Pyodide root for web).

### Methods

| Method              | Description                              |
|---------------------|------------------------------------------|
| `abspath(path)`     | Resolve VFS path to real filesystem path |
| `read(path)`        | Read file content as string              |
| `write(path, data)` | Write string data to file                |
| `open(path, mode)`  | Open file and return file object         |
| `exists(path)`      | Check if path exists                     |
| `listdir(path)`     | List directory contents                  |
| `mkdir(path)`       | Create directory (including parents)     |
| `remove(path)`      | Remove file or directory (recursive)     |
| `move(src, dst)`    | Move/rename a file or directory          |

### Path Resolution

```text
VFS root → data/ (native) or /app/ (web)
abspath("usr/apps") → /path/to/data/usr/apps
abspath("/sys/apps.json") → /path/to/data/sys/apps.json
```
