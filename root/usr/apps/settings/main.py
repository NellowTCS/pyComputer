"""
Settings app for pyComputer.
Provides theme selection, user preferences, and system configuration.
"""

import json
import os
from src.fs.vfs import VFS
from src.stdlib.appstdlib import (
    banner, info, error, success, confirm, input, table, warning, set_theme
)
from src.ui.theme import Theme

SETTINGS_DIR = "apps/settings"
SETTINGS_FILE = "apps/settings/config.json"

DEFAULT_SETTINGS = {
    "theme": "default",
    "username": "user",
    "password": "",
    "show_splash": True,
    "confirm_actions": True,
    "editor_width": 40,
}


def ensure_settings_dir(vfs):
    if not vfs.exists(SETTINGS_DIR):
        vfs.mkdir(SETTINGS_DIR)


def load_settings(vfs):
    ensure_settings_dir(vfs)
    if vfs.exists(SETTINGS_FILE):
        try:
            data = vfs.read(SETTINGS_FILE)
            return json.loads(data)
        except Exception:
            pass
    return DEFAULT_SETTINGS.copy()


def save_settings(vfs, settings):
    ensure_settings_dir(vfs)
    vfs.write(SETTINGS_FILE, json.dumps(settings, indent=2))


def get_available_themes():
    from src.ui.renderer import _TUIRO_THEMES, _CUSTOM_THEMES
    return _TUIRO_THEMES + list(_CUSTOM_THEMES.keys())


def get_setting_display(key, value):
    if key == "theme":
        return value
    elif key == "password":
        return "Set" if value else "Not set"
    elif key == "show_splash":
        return "Yes" if value else "No"
    elif key == "confirm_actions":
        return "Yes" if value else "No"
    elif key == "editor_width":
        return f"{value} chars"
    else:
        return str(value)


def show_current_settings(vfs):
    settings = load_settings(vfs)
    info("Current Settings:")
    rows = []
    for key in settings:
        val = get_setting_display(key, settings[key])
        rows.append([key, val])
    table(rows)


def edit_theme(vfs):
    settings = load_settings(vfs)
    themes = get_available_themes()
    info(f"Available themes: {', '.join(themes)}")
    current = settings.get("theme", "default")
    info(f"Current theme: {current}")
    choice = input("Select theme: ").strip().lower()
    if choice in themes:
        settings["theme"] = choice
        save_settings(vfs, settings)
        set_theme(choice)
        success(f"Theme set to '{choice}'")
    elif choice == "":
        info("Theme unchanged.")
    else:
        error(f"Invalid theme: {choice}")


def edit_username(vfs):
    settings = load_settings(vfs)
    current = settings.get("username", "user")
    info(f"Current username: {current}")
    choice = input("New username: ").strip()
    if choice:
        settings["username"] = choice
        save_settings(vfs, settings)
        success(f"Username set to '{choice}'")
    else:
        info("Username unchanged.")


def edit_password(vfs):
    import hashlib
    settings = load_settings(vfs)
    has_password = bool(settings.get("password", ""))
    info(f"Current: {'Password set' if has_password else 'No password'}")
    choice = input("New password (blank to remove): ").strip()
    if choice == "" and has_password:
        settings["password"] = ""
        save_settings(vfs, settings)
        success("Password removed.")
    elif choice:
        hashpw = hashlib.sha256(choice.encode()).hexdigest()[:16]
        settings["password"] = hashpw
        save_settings(vfs, settings)
        success("Password set.")
    else:
        info("Password unchanged.")


def edit_boolean(vfs, key, prompt, true_msg, false_msg):
    settings = load_settings(vfs)
    current = settings.get(key, True)
    yes_no = "Yes" if current else "No"
    info(f"Current: {yes_no}")
    choice = input(f"{prompt} [y/N]: ").strip().lower()
    if choice in ("y", "yes"):
        settings[key] = True
        save_settings(vfs, settings)
        success(true_msg)
    elif choice in ("n", "no"):
        settings[key] = False
        save_settings(vfs, settings)
        success(false_msg)
    else:
        info("Setting unchanged.")


def edit_editor_width(vfs):
    settings = load_settings(vfs)
    current = settings.get("editor_width", 40)
    info(f"Current: {current} chars")
    choice = input("Editor width (chars): ").strip()
    if choice.isdigit():
        width = int(choice)
        if 20 <= width <= 120:
            settings["editor_width"] = width
            save_settings(vfs, settings)
            success(f"Editor width set to {width}")
        else:
            error("Width must be between 20 and 120.")
    elif choice == "":
        info("Setting unchanged.")
    else:
        error("Invalid number.")


def reset_settings(vfs):
    if confirm("Reset all settings to defaults? [y/N] "):
        save_settings(vfs, DEFAULT_SETTINGS.copy())
        success("Settings reset to defaults.")
    else:
        info("Reset cancelled.")


def main(*args):
    vfs = VFS()
    show_current_settings(vfs)
    info("")

    while True:
        banner("Settings Menu")
        info("1. Theme")
        info("2. Username")
        info("3. Password")
        info("4. Show splash on boot")
        info("5. Confirm dangerous actions")
        info("6. Editor width")
        info("7. Reset all settings")
        info("8. View current settings")
        info("Q. Quit")
        choice = input("Choose: ").strip().lower()

        if choice == "1":
            edit_theme(vfs)
        elif choice == "2":
            edit_username(vfs)
        elif choice == "3":
            edit_password(vfs)
        elif choice == "4":
            edit_boolean(vfs, "show_splash", "Show splash on boot", "Splash enabled.", "Splash disabled.")
        elif choice == "5":
            edit_boolean(vfs, "confirm_actions", "Confirm dangerous actions", "Confirmation enabled.", "Confirmation disabled.")
        elif choice == "6":
            edit_editor_width(vfs)
        elif choice == "7":
            reset_settings(vfs)
        elif choice == "8":
            show_current_settings(vfs)
        elif choice == "q":
            info("Exiting Settings.")
            break
        else:
            error("Invalid choice.")