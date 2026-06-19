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

The root is automatically determined from:

1. `PYCOMPUTER_DATA_DIR` environment variable (if set)
2. Relative path to `data/` from the pyComputer package directory (native)
3. Pyodide root path (web)

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
VFS root → $PYCOMPUTER_DATA_DIR (if set), data/ (native), or /app/ (web)
abspath("usr/apps") → /path/to/data/usr/apps
abspath("/sys/apps.json") → /path/to/data/sys/apps.json
```
