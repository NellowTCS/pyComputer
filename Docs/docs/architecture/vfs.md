---
title: "VFS Layer"
description: "Virtual filesystem architecture"
---

## VFS Layer

The Virtual Filesystem (VFS) is a thin wrapper that maps logical paths to real filesystem paths.

### Root Resolution

The VFS root depends on the environment:

| Environment          | Root Path                     |
|----------------------|-------------------------------|
| Native (macOS/Linux) | `<project>/../data`           |
| Web (Pyodide)        | `/root` or `/pyComputer/root` |

### Path Mapping

```python
vfs = VFS()
vfs.abspath("usr/apps")     # → /path/to/data/usr/apps
vfs.abspath("sys/conf.json") # → /path/to/data/sys/conf.json
vfs.abspath("/boot/logo.txt") # → /path/to/data/boot/logo.txt
```

### Methods

| Method              | Implementation                                      |
|---------------------|-----------------------------------------------------|
| `abspath(path)`     | Joins with root, normalizes                         |
| `open(path, mode)`  | `open(self.abspath(path), mode)`                    |
| `read(path)`        | Reads entire file as string                         |
| `write(path, data)` | Writes string to file                               |
| `exists(path)`      | `os.path.exists(self.abspath(path))`                |
| `mkdir(path)`       | `os.makedirs(self.abspath(path), exist_ok=True)`    |
| `remove(path)`      | Removes file or directory tree                      |
| `move(src, dst)`    | `shutil.move(self.abspath(src), self.abspath(dst))` |
