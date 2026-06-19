---
title: "Quick Start"
description: "Get pyComputer running in under a minute"
---

## Quick Start

### Run pyComputer

```bash
cd pyComputer/pyComputer
uv run python main.py
```

You will see the boot logo, hardware logs, and then the shell prompt:

```text
[/] $
```

### Try the Shell

The shell supports standard commands:

```bash
[/] $ ls
usr/
sys/
boot/

[/] $ cat sys/motd.txt
Welcome to pyComputer!

[/] $ run calculator
```

### Install an App

Install from a directory:

```bash
[/] $ pkg install /path/to/myapp
```

Install from a URL:

```bash
[/] $ pkg install https://example.com/app.pycapp
```

Install from the registry:

```bash
[/] $ pkg install glyphformer
```

### Build a .pycapp

```bash
[/] $ pkg build myapp
```

### Run the Web Demo

```bash
cd Demo
npm run dev
```

Open `http://localhost:5173/` in your browser.
