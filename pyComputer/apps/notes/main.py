"""
Notes app entrypoint for pyComputer
"""

def main(*args):
    print("[notes] Welcome to Notes!")
    note = input("Type a note to save: ")
    with open("notes.txt", "a") as f:
        f.write(note + "\n")
    print("Note saved.")
