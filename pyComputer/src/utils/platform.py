"""Platform helpers for web vs native runtime detection."""

import sys


def is_web() -> bool:
    """Return True if running in a browser-based Python runtime like Pyodide."""
    if sys.platform in ("emscripten", "wasi"):
        return True

    if "pyodide" in sys.version.lower():
        return True

    try:
        import js  # type: ignore

        return hasattr(js, "window") or hasattr(js, "document")
    except Exception:
        return False


def is_native() -> bool:
    """Return True if running in a normal native Python runtime."""
    return not is_web()
