"""
Calculator app entrypoint for pyComputer (full implementation)
"""
from src.ui.renderer import Renderer
from src.fs.vfs import VFS
from src.utils.logging import info, error, warning

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
    r = Renderer()
    vfs = VFS()
    history = load_history(vfs)
    while True:
        r.banner("Calculator")
        r.info("Options: [C]alc  [H]istory  [Q]uit")
        choice = input("Choose: ").strip().lower()
        if choice == "c":
            expr = input("Enter expression (e.g. 2 + 2): ")
            try:
                # Safe eval: only math module and numbers
                allowed = {k: getattr(math, k) for k in dir(math) if not k.startswith("_")}
                allowed["abs"] = abs
                allowed["round"] = round
                result = eval(expr, {"__builtins__": {}}, allowed)
                r.success(f"Result: {result}")
                history.append(f"{expr} = {result}")
                save_history(vfs, history)
            except Exception as e:
                r.error(f"Error: {e}")
        elif choice == "h":
            r.banner("History")
            if history:
                for line in history[-20:]:
                    r.info(line)
            else:
                r.info("No history yet.")
            input("Press Enter to continue...")
        elif choice == "q":
            r.info("Exiting Calculator app.")
            break
        else:
            r.error("Unknown option.")
