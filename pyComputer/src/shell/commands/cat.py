def cmd_cat(shell, *args):
    if not args:
        print("Usage: cat <filename>")
        return
    filename = args[0]
    try:
        with open(filename, "r") as f:
            print(f.read())
    except Exception as e:
        print(f"[cat] Error: {e}")
