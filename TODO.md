# TODO.md

## Kernel & Core

- [ ] Implement kernel event loop (async/coroutine-based)
- [ ] Modularize subsystems (process, scheduler, IO, loader, registry, boot)
- [ ] Boot sequence with ASCII logo (readme)
- [ ] Dynamic app loader (no rebuild required)
- [ ] Persistent app registry
- [ ] User authentication

## Filesystem

- [ ] Integrate OPFS for persistent storage
- [ ] Build VFS abstraction and canonical paths

## UI Framework

- [ ] TUI renderer (canvas or \<pre>\ based)
- [ ] Widgets: text, boxes, lists, menus, dialogs, input
- [ ] Window manager and layout
- [ ] Keyboard input and keybindings
- [ ] Theme system? yep probably

## Networking

- [ ] HTTP fetch layer with caching

## Shell

- [ ] Command loop with history and autocomplete
- [ ] Built-in commands: ls, cat, edit, run, pkg, help
- [ ] Command parser with quoting rules

## Package Manager

- [ ] Install/update/remove apps from URL or local file
- [ ] Manifest schema and validation

## Apps

- [ ] App manifest and entrypoint standard
- [ ] Port Calculator as first app
- [ ] Notes app
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
