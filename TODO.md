# TODO.md

## Kernel & Core

- [X] Implement kernel event loop (async/coroutine-based)
- [X] Modularize subsystems (process, scheduler, IO, loader, registry, boot)
- [X] Boot sequence with ASCII logo (readme)
- [X] Dynamic app loader (no rebuild required)
- [X] Persistent app registry
- [ ] User authentication

## Filesystem

- [ ] Integrate OPFS for persistent storage
- [X] Build VFS abstraction and canonical paths

## UI Framework

- [X] TUI renderer (canvas or \<pre>\ based)
- [ ] Widgets: text, boxes, lists, menus, dialogs, input
- [ ] Window manager and layout
- [ ] Keyboard input and keybindings
- [ ] Theme system? yep probably

## Networking

- [X] HTTP fetch layer with caching

## Shell

- [X] Command loop with history and autocomplete
- [X] Built-in commands: ls, cat, edit, run, pkg, help
- [X] Command parser with quoting rules

## Package Manager

- [X] Install/update/remove apps from URL or local file
- [ ] Manifest schema and validation

## Apps

- [X] App manifest and entrypoint standard
- [X] Port Calculator as first app
- [X] Notes app
- [ ] Snake game
- [ ] Settings app

## PWA & Deployment

- [ ] Service worker for offline boot
- [ ] Bundle HTML shell, Pyodide, kernel, UI, etc
- [ ] Dynamic loading for apps, settings, user files

## Maybe future

- [ ] Theming/skins
- [ ] Save/load sessions
- [ ] Networking features (chat, multiplayer games)
- [ ] App store/discovery
