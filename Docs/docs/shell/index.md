---
title: "Shell"
description: "pyComputer shell overview"
---

## Shell

The pyComputer shell is a command-line interface that handles input, executes built-in commands, and launches apps.

### Prompt

The shell prompt shows the current working directory:

```text
[/] $
[/usr/apps] $
```

### Input

The shell uses `pyc_input()` for cross-platform input. On Unix it uses readline (history, tab completion). On Windows it falls back to `input()`. In the browser it reads from the web input queue.

### Command Parsing

Commands are parsed with `shlex.split()`, supporting single and double quotes, escape sequences, and whitespace handling.

### Built-in Commands

| Command | Description             |
|---------|-------------------------|
| `help`  | Show available commands |
| `exit`  | Exit the shell          |
| `echo`  | Print arguments         |
| `ls`    | List directory contents |
| `cat`   | Print file contents     |
| `edit`  | Edit a file             |
| `run`   | Launch an app           |
| `pkg`   | Package manager         |
| `clear` | Clear the screen        |
| `cd`    | Change directory        |
| `rm`    | Remove files            |
