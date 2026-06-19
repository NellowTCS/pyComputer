---
title: "Standard Library"
description: "SDK std module reference"
---

## Standard Library

```python
from pycomputersdk.std import (
    input, info, error, success, warning, confirm, pause,
    section, subsection, banner, table, spinner, step,
    clear, clear_line, hide_cursor, show_cursor,
    bold, dim, green, red, yellow, cyan,
    box, box_at,
    print_exception, sleep, get_env, set_env, app_exit,
    print_table, print_banner, ask_choice,
    set_theme, get_theme,
)
```

### I/O Functions

| Function        | Description                            |
|-----------------|----------------------------------------|
| `input(prompt)` | Read a line of text from the user      |
| `info(msg)`     | Print info message                     |
| `error(msg)`    | Print error message                    |
| `success(msg)`  | Print success message                  |
| `warning(msg)`  | Print warning message                  |
| `confirm(msg)`  | Ask for y/N confirmation, returns bool |
| `pause()`       | Wait for Enter key                     |

### Render Functions

| Function            | Description                           |
|---------------------|---------------------------------------|
| `section(title)`    | Section header                        |
| `subsection(title)` | Subsection header                     |
| `banner(title)`     | Big banner                            |
| `table(rows)`       | Render list-of-lists as aligned table |
| `spinner(msg)`      | Context manager for progress spinner  |
| `step(title)`       | Context manager for step indicator    |

### Utility Functions

| Function                      | Description                         |
|-------------------------------|-------------------------------------|
| `sleep(seconds)`              | Sleep helper                        |
| `get_env(key)`                | Get environment variable            |
| `set_env(key, value)`         | Set environment variable            |
| `app_exit(code=0)`            | Exit the app                        |
| `print_exception()`           | Print current exception traceback   |
| `ask_choice(prompt, choices)` | Show numbered menu, return selected |
| `set_theme(name)`             | Switch theme                        |
| `get_theme()`                 | Get current theme name              |
