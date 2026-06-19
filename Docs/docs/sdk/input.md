---
title: "Input Handling"
description: "SDK keyboard input reference"
---

## Input Handling

```python
from pycomputersdk import get_key, Key, web_input_queue, setup_raw, restore, cleanup
```

### Functions

#### `get_key() -> str | None`

Reads a single keypress. Returns `None` if no key is available (non-blocking).

#### `setup_raw() -> list | None`

Enables raw terminal mode. Returns the previous terminal settings (pass to `restore()`).

#### `restore(settings)`

Restores terminal to the given settings.

#### `cleanup()`

Clears screen, shows cursor, resets terminal.

### Key Constants

```python
Key.UP         # "\x1b[A"
Key.DOWN       # "\x1b[B"
Key.RIGHT      # "\x1b[C"
Key.LEFT       # "\x1b[D"
Key.ENTER      # "\r"
Key.ESCAPE     # "\x1b"
Key.TAB        # "\t"
Key.BACKSPACE  # "\x7f"
Key.DELETE     # "\x1b[3~"
Key.HOME       # "\x1b[H"
Key.END        # "\x1b[F"
Key.PAGE_UP    # "\x1b[5~"
Key.PAGE_DOWN  # "\x1b[6~"
Key.F1 - F4    # Function keys
```

### Web Input

In the browser (Pyodide), input is received via `web_input_queue`. JavaScript pushes key events into the queue, and `get_key()` pops from it.
