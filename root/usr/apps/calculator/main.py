"""
Calculator app entrypoint for pyComputer (full implementation)
"""

from src.fs.vfs import VFS
from src.stdlib.appstdlib import input, info, error, success, banner, pause

import math

HIST_PATH = "apps/calculator/data/history.txt"


def ensure_hist_dir(vfs):
    import os

    hist_dir = os.path.dirname(HIST_PATH)
    if not vfs.exists(hist_dir):
        vfs.mkdir(hist_dir)


def load_history(vfs):
    ensure_hist_dir(vfs)
    if vfs.exists(HIST_PATH):
        return vfs.read(HIST_PATH).splitlines()
    return []


def save_history(vfs, history):
    ensure_hist_dir(vfs)
    vfs.write(HIST_PATH, "\n".join(history) + "\n")


def main(*args):
    vfs = VFS()
    history = load_history(vfs)
    while True:
        banner("Calculator")
        info("Options: [C]alc  [H]istory  [Q]uit")
        choice = input("Choose: ").strip().lower()
        if choice == "c":
            expr = input("Enter expression (e.g. 2 + 2): ")
            try:
                # Safe eval: only math module and numbers
                allowed = {
                    k: getattr(math, k) for k in dir(math) if not k.startswith("_")
                }
                allowed["abs"] = abs
                allowed["round"] = round
                result = eval(expr, {"__builtins__": {}}, allowed)
                success(f"Result: {result}")
                history.append(f"{expr} = {result}")
                save_history(vfs, history)
            except Exception as e:
                error(f"Error: {e}")
        elif choice == "h":
            banner("History")
            if history:
                for line in history[-20:]:
                    info(line)
            else:
                info("No history yet.")
            pause()
        elif choice == "q":
            info("Exiting Calculator app.")
            break
        else:
            error("Unknown option.")
