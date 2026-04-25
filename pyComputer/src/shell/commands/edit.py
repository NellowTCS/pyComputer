from src.utils.platform import pyc_input

def cmd_edit(shell, *args):
    if not args:
        print("Usage: edit <filename>")
        return
    filename = args[0]
    try:
        line = pyc_input(f"Enter a line to append to {filename}: ")
        with open(filename, "a") as f:
            f.write(line + "\n")
        print(f"[edit] Line appended to {filename}.")
    except Exception as e:
        print(f"[edit] Error: {e}")
