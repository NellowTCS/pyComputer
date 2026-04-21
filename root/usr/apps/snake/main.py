"""
Snake app entrypoint for pyComputer
"""
import random
import sys
import termios
import threading
import time
from collections import deque
from src.ui.renderer import Renderer

COLS = 30
ROWS = 15
BASE_TICK = 0.15
MIN_TICK = 0.06

HEAD  = "▓▓"
BODY  = "░░"
FOOD  = "██"
EMPTY = "  "

r = Renderer()


def render_x(col):
    return 2 + col * 2

def render_y(row):
    return 3 + row


def safe_style(style_fn, text):
    """Call a Renderer style method safely; return plain text on failure."""
    try:
        result = style_fn(text)
        if isinstance(result, str):
            return result
    except (TypeError, AttributeError):
        pass
    return text


class SnakeGame:
    def __init__(self):
        self.snake: deque = deque()
        self.reset()

    def reset(self):
        start = (COLS // 2, ROWS // 2)
        self.snake = deque([start])
        self.direction = (1, 0)
        self.next_dir = None
        self.food = self._spawn_food()
        self.score = 0
        self.game_over = False
        self.paused = False

    def _spawn_food(self):
        occupied = set(self.snake)
        while True:
            pos = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
            if pos not in occupied:
                return pos

    def level(self):
        return self.score // 50 + 1

    def tick_duration(self):
        speed = BASE_TICK - (self.level() - 1) * 0.01
        return max(speed, MIN_TICK)

    def set_direction(self, d):
        if d[0] == -self.direction[0] and d[1] == -self.direction[1]:
            return
        self.next_dir = d

    def update(self):
        if self.next_dir:
            self.direction = self.next_dir
            self.next_dir = None

        hx, hy = self.snake[0]
        dx, dy = self.direction
        new_head = (hx + dx, hy + dy)
        nx, ny = new_head

        if nx < 0 or nx >= COLS or ny < 0 or ny >= ROWS or new_head in self.snake:
            self.game_over = True
            return

        self.snake.appendleft(new_head)
        if new_head == self.food:
            self.score += 10
            self.food = self._spawn_food()
        else:
            self.snake.pop()


def draw_border():
    # box_at places each line at the correct terminal row; write(box(...)) would
    # let the newlines scroll instead of positioning each line properly
    box_w = COLS * 2 + 2  # 2 chars per cell + 2 border chars
    box_h = ROWS + 2      # ROWS of cells + top and bottom border row
    r.box_at(1, 2, box_w, box_h).flush()

def draw_header(game):
    label = r.bold(f" SNAKE  Score: {game.score:<5}  Level: {game.level()} ")
    r.move(1, 1).write(label).flush()

def draw_footer():
    text = safe_style(r.dim, "  Arrow keys: move  P: pause  R: restart  Q: quit  ")
    r.move(1, 4 + ROWS).write(text).flush()

def draw_cell(col, row, char, style_fn=None):
    tx = render_x(col)
    ty = render_y(row)
    text = safe_style(style_fn, char) if style_fn else char
    r.move(tx, ty).write(text).flush()

def full_redraw(game):
    # Use explicit cursor-home after erase so all terminals land at row 1 col 1
    sys.stdout.write("\033[2J\033[1;1H")
    sys.stdout.flush()
    draw_border()
    draw_footer()
    draw_header(game)

    for row in range(ROWS):
        for col in range(COLS):
            draw_cell(col, row, EMPTY)

    fx, fy = game.food
    draw_cell(fx, fy, FOOD, r.bright_red)

    for i, (sx, sy) in enumerate(game.snake):
        if i == 0:
            draw_cell(sx, sy, HEAD, r.bright_green)
        else:
            draw_cell(sx, sy, BODY, r.green)

    r.flush()

def partial_update(game, prev_tail, prev_food):
    draw_header(game)

    if prev_tail and prev_tail not in game.snake:
        draw_cell(prev_tail[0], prev_tail[1], EMPTY)

    if len(game.snake) > 1:
        sx, sy = list(game.snake)[1]
        draw_cell(sx, sy, BODY, r.green)

    hx, hy = game.snake[0]
    draw_cell(hx, hy, HEAD, r.bright_green)

    if prev_food != game.food:
        draw_cell(game.food[0], game.food[1], FOOD, r.bright_red)

    r.flush()

def draw_overlay(game):
    # Position overlay in the vertical center of the playfield using terminal rows
    box_w = 32
    cy = 3 + ROWS // 2 - 2  # terminal row: playfield starts at row 3

    if game.game_over:
        r.box_at(2, cy, box_w, 5)
        r.move(4, cy + 1).write(r.bold("        GAME OVER        ")).flush()
        r.move(4, cy + 2).write(r.bold(f"   Final score: {game.score:<5}   ")).flush()
        r.move(4, cy + 3).write(safe_style(r.dim, "   R: restart   Q: quit   ")).flush()
    elif game.paused:
        r.box_at(2 + COLS - 10, cy + 1, 20, 3)
        r.move(2 + COLS - 8, cy + 2).write(r.bold("     PAUSED     ")).flush()

    r.flush()


_input_key = None
_input_lock = threading.Lock()
_input_thread_started = False

def _input_thread():
    global _input_key
    import readchar
    while True:
        key = readchar.readkey()
        with _input_lock:
            _input_key = key

def flush_input():
    """Discard any pending key that arrived before/during a transition."""
    global _input_key
    with _input_lock:
        _input_key = None

def get_key():
    global _input_key
    with _input_lock:
        key = _input_key
        _input_key = None
    return key

def setup_terminal():
    """Switch stdin to raw/no-echo mode. Returns old termios settings."""
    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    new = termios.tcgetattr(fd)
    new[3] = new[3] & ~termios.ICANON & ~termios.ECHO
    # TCSANOW: apply immediately, don't wait for drain
    termios.tcsetattr(fd, termios.TCSANOW, new)
    return old

def restore_terminal(old_settings):
    """Restore terminal to its pre-game state."""
    fd = sys.stdin.fileno()
    # TCSAFLUSH: restore immediately AND discard any input queued during the game,
    # so the shell does not see leftover keypresses after quit
    termios.tcsetattr(fd, termios.TCSAFLUSH, old_settings)
    # Move cursor below the game area, reset all SGR attributes, show cursor
    r.move(1, ROWS + 5).write("\033[0m").flush()
    sys.stdout.write("\n")
    sys.stdout.flush()

def main(*args):
    import readchar

    game = SnakeGame()

    # Save terminal state BEFORE starting input thread so readchar
    # doesn't consume characters that belong to the shell
    old_settings = setup_terminal()

    # Start input thread after raw mode is active
    t = threading.Thread(target=_input_thread, daemon=True)
    t.start()

    try:
        r.hide_cursor()

        full_redraw(game)

        # Center the start box in the playfield in terminal coordinates
        # Playfield inner width: COLS*2 cols starting at terminal col 2
        # Playfield inner height: ROWS rows starting at terminal row 3
        box_w = 28
        box_h = 3
        scr_mid_x = 2 + COLS        # terminal col at horizontal center of playfield
        scr_mid_y = 3 + ROWS // 2   # terminal row at vertical center of playfield
        bx = scr_mid_x - box_w // 2
        by = scr_mid_y - box_h // 2
        r.box_at(bx, by, box_w, box_h)
        r.move(bx + 2, by + 1).write(r.bold(" Press any key to start ")).flush()

        # Drain any keys buffered before raw mode took effect
        flush_input()
        while get_key() is None:
            time.sleep(0.05)

        full_redraw(game)
        # Flush again so the "start" keypress doesn't register as a move
        flush_input()
        last_tick = time.time()

        while True:
            key = get_key()

            if key == 'q':
                break
            elif key == 'r':
                game.reset()
                full_redraw(game)
                flush_input()
                last_tick = time.time()
                continue
            elif key == 'p' and not game.game_over:
                game.paused = not game.paused
                if game.paused:
                    draw_overlay(game)
                else:
                    full_redraw(game)
                    flush_input()
                    last_tick = time.time()

            if not game.paused and not game.game_over:
                if key == readchar.key.UP:
                    game.set_direction((0, -1))
                elif key == readchar.key.DOWN:
                    game.set_direction((0, 1))
                elif key == readchar.key.LEFT:
                    game.set_direction((-1, 0))
                elif key == readchar.key.RIGHT:
                    game.set_direction((1, 0))

            now = time.time()
            if not game.paused and not game.game_over:
                if now - last_tick >= game.tick_duration():
                    prev_tail = game.snake[-1]
                    prev_food = game.food
                    game.update()
                    if game.game_over:
                        draw_overlay(game)
                    else:
                        partial_update(game, prev_tail, prev_food)
                    last_tick = now

            time.sleep(0.01)

    finally:
        # Always restore terminal, even on exception or KeyboardInterrupt
        r.show_cursor()
        restore_terminal(old_settings)
