# pyComputer

```txt
                            _/_/_/                                                  _/                          
     _/_/_/    _/    _/  _/          _/_/    _/_/_/  _/_/    _/_/_/    _/    _/  _/_/_/_/    _/_/    _/  _/_/   
    _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/_/_/_/  _/_/        
   _/    _/  _/    _/  _/        _/    _/  _/    _/    _/  _/    _/  _/    _/    _/      _/        _/           
  _/_/_/      _/_/_/    _/_/_/    _/_/    _/    _/    _/  _/_/_/      _/_/_/      _/_/    _/_/_/  _/            
 _/              _/                                      _/                                                     
_/          _/_/                                        _/                                                      
```


## Web Demo

Try pyComputer instantly in your browser: [nellowtcs.me/pyComputer](https://nellowtcs.me/pyComputer)

## Overview

**pyComputer** is a Python-based virtual computer environment that simulates a full operating system experience, complete with a shell, virtual file system, package management, and user applications. Includes a built-in IDE and a variety of demo apps.


## Features

- **Custom Shell**: Built-in shell with ze Linux commands (`ls`, `cd`, `cat`, `edit`, `echo`, `clear`, `help`, `exit`, etc.)
- **Virtual File System**: Filesystem (yes a real one, see the root folder) for file and directory operations
- **App Loader**: Run and manage user applications (see `root/usr/apps/`)
- **IDE**: Built-in TUI IDE with file tree, editor, toolbar, and run output (`run ide`)
- **Package Manager**: Install, list, and remove apps with `pkg` command
- **User Authentication**: Optional password protection and user settings
- **Theming**: Changeable UI themes
- **System Info**: `pyfetch` command as a neofetch clone
- **Extensible**: Add your own shell commands and apps easily


## Built-in Apps

| App         | Description                                              |
|-------------|----------------------------------------------------------|
| calculator  | A simple calculator app for pyComputer                   |
| ide         | TUI IDE with editor, file tree, toolbar, and run output  |
| matrix      | Matrix-style terminal rain animation                     |
| notes       | Simple notes app                                         |
| settings    | Configure theme, username, and system preferences        |
| snake       | A seemingly simple Snake game                            |

Launch any app with `run <appname>`, e.g. `run ide` or `run calculator`.

## How to Use

### Installation

Clone the repository and ensure you have Python 3.8+ installed.

```bash
git clone https://github.com/NellowTCS/pyComputer.git
cd pyComputer/pyComputer
python main.py
```

### Basic Shell Commands

- `help` - List available commands
- `ls [dir]` - List files in a directory
- `cd [dir]` - Change current directory
- `cat <file>` - View file contents
- `edit <file>` - Append a line to a file
- `echo <text>` - Print text
- `clear` - Clear the terminal
- `exit` - Exit the shell
- `pyfetch` - Show system info and ASCII art
- `run <app>` - Run an installed app
- `pkg [list|install|remove]` - Manage apps/packages
- `rm [-r] <file>` - Remove files or directories

### Running Apps

Apps are located in `root/usr/apps/`. To run an app:

```bash
run calculator
```

### Package Management

- List installed apps: `pkg list`
- Install an app: `pkg install <source_path>`
- Remove an app: `pkg remove <app_name>`

### Settings & Theming

Open the Settings app to change your settings:
```bash
run settings
```

## Contributing

Feel free to open issues or pull requests to add features, fix bugs, or improve documentation.

## License

This project is licensed under the MIT License.
