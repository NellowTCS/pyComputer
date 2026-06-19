---
title: "Shell Commands"
description: "Detailed shell command reference"
---

## Shell Commands

### `help`

Show available commands.

```bash
[/] $ help
```

### `exit`

Exit the shell and shut down pyComputer.

```bash
[/] $ exit
```

### `echo <message>`

Print arguments to the terminal.

```bash
[/] $ echo Hello, world!
Hello, world!
```

### `ls [path]`

List directory contents. Defaults to current directory.

```bash
[/] $ ls
usr/
sys/
boot/

[/] $ ls usr/apps/
calculator/
notes/
settings/
snake/
ide/
matrix/
```

### `cat <path>`

Print file contents.

```bash
[/] $ cat sys/motd.txt
Welcome to pyComputer!
```

### `edit <path>`

Open a file in the built-in line editor.

```bash
[/] $ edit hello.txt
```

### `run <app> [args...]`

Launch an installed app or run from a path.

```bash
[/] $ run calculator
[/] $ run ../myapps/test
[/] $ run ~/projects/myapp
```

### `pkg <action> [args...]`

Package manager. See [Package Manager](/shell/pkg).

### `clear`

Clear the terminal screen.

```bash
[/] $ clear
```

### `cd <path>`

Change the current directory.

```bash
[/] $ cd usr/apps
[/usr/apps] $
```

### `rm [-r] <path>`

Remove files and directories.

```bash
[/] $ rm hello.txt
[/] $ rm -r mydir/
```
