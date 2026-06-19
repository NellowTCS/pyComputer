---
title: ".pycapp Format"
description: "The .pycapp distribution format"
---

## .pycapp Format

`.pycapp` is the distribution format for pyComputer apps. It is a standard ZIP archive containing all app files plus a `manifest.json` at the root.

### Structure

```text
myapp.pycapp
  manifest.json
  main.py
  ...
```

The archive is created with `zipfile.ZIP_DEFLATED` compression.

### Building

Inside pyComputer:

```bash
[/] $ pkg build myapp
```

From the command line with the SDK CLI:

```bash
cd myapp
pycomp build .
```

Or using the `bundle()` function directly:

```python
from pycomputersdk.pkg import bundle
result_path, digest = bundle("myapp", source_dir="/path/to/myapp")
```

### Installing

```bash
[/] $ pkg install path/to/myapp.pycapp
[/] $ pkg install https://example.com/myapp.pycapp
```

### Security

When installing a `.pycapp` archive or downloading from a URL, `pkg install` validates:

- The manifest is valid JSON and conforms to the Manifest schema
- The app name does not contain path separators or `..`
- Each extracted file stays within the destination directory (no path traversal)
- Remote URLs require HTTPS

For plain directory installs (`pkg install /path/to/dir`), only the manifest is validated; the directory is copied as-is without additional security checks.

### Checksum

When built, the bundler prints a SHA-256 hash of the archive. Verify downloads against this hash if integrity is critical.
