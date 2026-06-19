---
title: "Boot Sequence"
description: "What happens when pyComputer starts"
---

## Boot Sequence

### Step 1: Data Disk Initialization

`ensure_data_dir()` checks if `data/` exists. If not, it creates the data disk from the golden master (`root/`):

1. Create staging directory `data.staging/`
2. Copy `root/` → `data.staging/` with `shutil.copytree`
3. Atomic rename `data.staging/` → `data/`

This guarantees that if the copy is interrupted, `data/` will not exist and initialization will retry on the next boot.

### Step 2: Settings Load

Loads `data/apps/settings/config.json` for theme, username, and preferences. Falls back to defaults if the file is missing.

### Step 3: (Optional) Authentication

If a password hash is configured in settings, the user must log in before the shell starts.

### Step 4: Logo and Hardware Logs

The boot sequence renders:

1. The ASCII logo from `boot/logo.txt`
2. Kernel version and hardware initialization messages
3. System uptime

### Step 5: Shell Launch

The shell starts its event loop, presenting the prompt and waiting for commands.
