---
title: "Renderer"
description: "SDK Renderer class reference"
---

## Renderer

The `Renderer` class manages terminal output with double-buffering, themes, and ANSI styling.

```python
from pycomputersdk import Renderer
```

### Constructor

```python
Renderer(ci_mode=False, theme="default")
```

- `ci_mode` - disable tuiro rendering for CI/output-redirected environments
- `theme` - one of `"default"`, `"mono"`, `"pastel"`, `"retro"`, `"light"`, `"dark"`

### Methods

#### Screen Control

| Method          | Description                                    |
|-----------------|------------------------------------------------|
| `clear()`       | Clear entire screen                            |
| `clear_line()`  | Clear current line                             |
| `move(x, y)`    | Move cursor to column `x`, row `y` (1-indexed) |
| `write(text)`   | Write text at current cursor position          |
| `flush()`       | Flush output buffer                            |
| `hide_cursor()` | Hide terminal cursor                           |
| `show_cursor()` | Show terminal cursor                           |

#### Styling

| Method               | Description  |
|----------------------|--------------|
| `bold(text)`         | Render bold  |
| `dim(text)`          | Render dim   |
| `green(text)`        | Green text   |
| `red(text)`          | Red text     |
| `yellow(text)`       | Yellow text  |
| `cyan(text)`         | Cyan text    |
| `bright_green(text)` | Bright green |
| `bright_red(text)`   | Bright red   |
| `bright_cyan(text)`  | Bright cyan  |

#### Box Drawing

| Method                                    | Description                  |
|-------------------------------------------|------------------------------|
| `box(width, height, title=None)`          | Render a box frame as string |
| `box_at(x, y, width, height, title=None)` | Render box at position       |

#### Theming

| Method            | Description             |
|-------------------|-------------------------|
| `set_theme(name)` | Switch theme at runtime |
| `get_theme()`     | Get current theme name  |

#### tuiro Integration (when available)

| Method              | Description                             |
|---------------------|-----------------------------------------|
| `section(title)`    | Render a section header                 |
| `subsection(title)` | Render a subsection header              |
| `info(message)`     | Info message                            |
| `success(message)`  | Success message                         |
| `warning(message)`  | Warning message                         |
| `error(message)`    | Error message                           |
| `banner(title)`     | Render a banner                         |
| `table(rows)`       | Render a table                          |
| `spinner(message)`  | Show a spinner (context manager)        |
| `step(title)`       | Show a step indicator (context manager) |
