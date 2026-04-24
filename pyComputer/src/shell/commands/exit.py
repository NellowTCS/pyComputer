from src.utils.platform import is_web


def cmd_exit(shell, *args):
    if is_web():
        print("[shell] HAHA nice try, but you can't exit the shell in a web environment! >:3")
        return
    else:
        print("[shell] Exiting shell.")
    raise SystemExit
