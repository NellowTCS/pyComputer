"""
Notes app entrypoint for pyComputer
"""
from src.ui.renderer import Renderer

def main(*args):
    r = Renderer()
    r.banner("Notes")
    note = input("Type a note to save: ")
    with open("notes.txt", "a") as f:
        f.write(note + "\n")
    r.success("Note saved.")
