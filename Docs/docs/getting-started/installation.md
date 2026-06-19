---
title: "Installation"
description: "Install pyComputer on your system"
---

## Installation

### Prerequisites

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip
- Git

### Clone and Run

```bash
git clone https://github.com/NellowTCS/pyComputer
cd pyComputer/pyComputer
uv run python main.py
```

The first boot copies the golden master (`root/`) to the data disk (`data/`). Subsequent boots skip this step.

### Web Demo

```bash
cd Demo
npm install
npm run dev
```

### SDK Installation

```bash
cd pyComputerSDK
uv pip install -e .
```

Or from PyPI:

```bash
uv pip install pycomputersdk
```

### Dependencies

- `tuiro` - TUI rendering engine (installed automatically as a dependency of pyComputer)
- `requests` - HTTP networking (optional for URL installs)
- `readline` - Shell autocomplete (optional, macOS has it built-in)
