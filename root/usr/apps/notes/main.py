"""
Notes app entrypoint for pyComputer (separate text files per note)
"""

from src.fs.vfs import VFS
from src.utils.text import truncate
from src.stdlib.appstdlib import input, info, error, success, banner, table

NOTES_DIR = "apps/notes/data"


def sanitize_filename(title):
    import re

    return re.sub(r"[^a-zA-Z0-9_\- ]", "_", title).strip().replace(" ", "_")


def ensure_notes_dir(vfs):
    if not vfs.exists(NOTES_DIR):
        vfs.mkdir(NOTES_DIR)


def list_notes(vfs):
    ensure_notes_dir(vfs)
    files = vfs.listdir(NOTES_DIR)
    notes = []
    for f in files:
        if f.endswith(".txt"):
            notes.append(f[:-4])
    return sorted(notes)


def read_note(vfs, title):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    if vfs.exists(path):
        return vfs.read(path)
    return ""


def write_note(vfs, title, body):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    vfs.write(path, body)


def delete_note(vfs, title):
    fname = sanitize_filename(title) + ".txt"
    path = f"{NOTES_DIR}/{fname}"
    if vfs.exists(path):
        vfs.remove(path)


def main(*args):

    vfs = VFS()
    while True:
        banner("Notes")
        note_titles = list_notes(vfs)
        info(f"You have {len(note_titles)} notes.")
        table([[str(i + 1), t[:40]] for i, t in enumerate(note_titles)])
        info("Options: [A]dd  [V]iew  [E]dit  [D]elete  [Q]uit")
        choice = input("Choose: ").strip().lower()
        if choice == "a":
            title = input("Note title (File name): ")
            if not title:
                error("Title cannot be empty.")
                continue
            body = input("Note body: ")
            write_note(vfs, title, body)
            success("Note added.")
        elif choice == "v":
            idx = input("View note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                body = read_note(vfs, title)
                banner(title)
                info(body)
            else:
                error("Invalid note number.")
        elif choice == "e":
            idx = input("Edit note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                body = read_note(vfs, title)
                new_title = input(f"New title (blank to keep '{title}'): ")
                if not new_title:
                    new_title = title
                new_body = input(f"New body (blank to keep current): ")
                if not new_body:
                    new_body = body
                if new_title != title:
                    delete_note(vfs, title)
                write_note(vfs, new_title, new_body)
                success("Note updated.")
            else:
                error("Invalid note number.")
        elif choice == "d":
            idx = input("Delete note #: ")
            if idx.isdigit() and 1 <= int(idx) <= len(note_titles):
                title = note_titles[int(idx) - 1]
                delete_note(vfs, title)
                success("Note deleted.")
            else:
                error("Invalid note number.")
        elif choice == "q":
            info("Exiting Notes app.")
            break
        else:
            error("Unknown option.")
