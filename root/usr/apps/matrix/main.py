"""
Matrix app entrypoint for pyComputer
Renders a Matrix-style rain animation in the terminal.
"""

import random
import sys
import time
from src.ui.renderer import Renderer


CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
COLS = 40  # Fewer columns for less density
ROWS = 24  # Standard terminal height
SPEED = 0.04
TRAIL = 12  # Length of the fading trail

r = Renderer()


def main(*args):
    # Hide cursor and clear screen
    sys.stdout.write("\033[2J\033[1;1H")
    sys.stdout.flush()
    r.hide_cursor()
    try:
        # Each column has a y position for the head of the rain
        drops = [random.randint(0, ROWS) for _ in range(COLS)]
        chars = [random.choice(CHARS) for _ in range(COLS)]
        while True:
            # Clear the background area
            for row in range(ROWS + 2):
                r.move(2, 2 + row).write(" " * (COLS * 2))
            # Draw the rain
            for i in range(COLS):
                # Randomly reset drop to top
                if drops[i] > ROWS or random.random() > 0.995:
                    drops[i] = 0
                    chars[i] = random.choice(CHARS)
                # Draw the trail
                for t in range(TRAIL):
                    y = drops[i] - t
                    if 0 <= y < ROWS:
                        c = chars[i] if t == 0 else random.choice(CHARS)
                        if t == 0:
                            style = r.bright_green
                        elif t < TRAIL // 2:
                            style = r.green
                        else:
                            style = r.dim
                        r.move(2 + i * 2, 2 + y).write(style(c))
                drops[i] += 1
            r.flush()
            time.sleep(SPEED)
    except KeyboardInterrupt:
        pass
    finally:
        r.show_cursor()
        sys.stdout.write("\033[0m\033[2J\033[1;1H")
        sys.stdout.flush()
