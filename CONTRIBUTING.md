# Contributing

## Development Setup

```bash
git clone https://github.com/NellowTCS/pyComputer
cd pyComputer/pyComputer
uv pip install -e .
uv run python main.py
```

## Code Style

- Follow PEP 8 with the project's existing conventions
- Use `ruff` for linting
- All public API functions must have docstrings
- No commented-out dead code
- Handle errors explicitly — no bare `except:`
- Type hints preferred

## Testing

```bash
# Run pyComputer
cd pyComputer/pyComputer && uv run python main.py

# Run tests
uv run pytest

# Run tests with coverage
uv run pytest --cov
```

## Project Layout

```text
pyComputer/pyComputer/
  pycomputer/
    kernel/      — Boot, Kernel, Loader, Registry, Scheduler
    shell/       — Shell loop, commands, parser
    ui/          — Renderer, input, theme, widgets, palettes
    pkg/         — Package manager, bundler, manifest
    fs/          — Virtual filesystem
    net/         — HTTP networking
    utils/       — Platform detection, text, logging
    stdlib/      — App standard library
  root/          — Golden master (read-only, version-controlled)
  data/          — Runtime disk (gitignored, ephemeral)
  main.py        — Entry point
```

## Web Demo

```bash
cd Demo
npm install
npm run dev     # builds bundle + starts vite dev server
npm run build   # builds bundle + production build
```

## SDK

```bash
cd pyComputerSDK
uv pip install -e .
```

The SDK is published to PyPI as `pycomputersdk`. Edits to `pycomputer.*` modules are reflected automatically via the editable install.
