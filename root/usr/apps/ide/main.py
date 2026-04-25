"""
IDE - A proper TUI code editor for pyComputer
"""

import sys
import os
import time
import subprocess
import traceback
import io
import contextlib
from collections import deque
from src.ui.renderer import Renderer
from src.ui.input import get_key, setup_raw, restore, cleanup, Key, web_input_queue
from src.fs.vfs import VFS
from src.utils.platform import is_web

#  Layout constants
TOOLBAR_H   = 2   # top toolbar rows
STATUSBAR_H = 1   # bottom status bar
FILETREE_W  = 22  # left file-tree panel width
OUTPUT_H    = 10  # bottom output panel height (when visible)

# ANSI helpers
ESC = "\033["
def goto(x, y):       return f"{ESC}{y};{x}H"
def clr_line():       return f"{ESC}2K"
def clr_screen():     return "\033[2J\033[H"
def bold(t):          return f"\033[1m{t}\033[0m"
def dim(t):           return f"\033[2m{t}\033[0m"
def rev(t):           return f"\033[7m{t}\033[0m"
def fg(c, t):         return f"\033[38;5;{c}m{t}\033[0m"
def bg(c, t):         return f"\033[48;5;{c}m{t}\033[0m"
def fgbg(f, b, t):    return f"\033[38;5;{f}m\033[48;5;{b}m{t}\033[0m"

# Color palette (256-color)
C_BG        = 235   # editor background
C_FILETREE  = 237   # file tree bg
C_TOOLBAR   = 232   # toolbar bg
C_STATUS    = 234   # status bar bg
C_OUTPUT    = 233   # output panel bg
C_ACCENT    = 75    # blue accent
C_GREEN     = 114   # green
C_YELLOW    = 221   # yellow
C_RED       = 203   # red
C_MUTED     = 243   # muted text
C_WHITE     = 252   # normal text
C_SELECT    = 238   # selected line bg
C_LINENUM   = 241   # line number color
C_CURSOR    = 220   # cursor highlight
C_TABACTIVE = 75
C_TABINACT  = 239

HELP_KEYS = [
    ("^S", "Save"),
    ("^E", "Run"),
    ("^G", "New"),
    ("^K", "Close"),
    ("^X", "Quit"),
    ("F1", "Help"),
    ("Tab", "Indent"),
    ("↑↓←→", "Move"),
]

SYNTAX_KEYWORDS = {
    "def", "class", "return", "import", "from", "if", "else", "elif",
    "while", "for", "in", "not", "and", "or", "True", "False", "None",
    "try", "except", "finally", "with", "as", "pass", "break", "continue",
    "lambda", "yield", "raise", "global", "nonlocal", "del", "assert",
    "async", "await",
}

def syntax_highlight_line(line):
    """Very simple token-by-token syntax highlighting."""
    # We do a basic pass — strings, comments, keywords, numbers
    result = []
    i = 0
    in_string = None
    buf = ""

    def flush_buf(buf):
        if not buf:
            return ""
        if buf in SYNTAX_KEYWORDS:
            return fg(C_ACCENT, buf)
        try:
            float(buf)
            return fg(C_YELLOW, buf)
        except ValueError:
            pass
        if buf.startswith("#"):
            return fg(C_MUTED, buf)
        return fg(C_WHITE, buf)

    # Comment detection first
    stripped = line.lstrip()
    if stripped.startswith("#"):
        indent_part = line[:len(line) - len(stripped)]
        return indent_part + fg(C_MUTED, stripped)

    # Simple tokenizer
    out = ""
    j = 0
    n = len(line)
    while j < n:
        ch = line[j]
        # String detection
        if ch in ('"', "'") and not in_string:
            # flush buf
            out += flush_buf(buf)
            buf = ""
            q = ch
            # triple?
            if line[j:j+3] in ('"""', "'''"):
                q = line[j:j+3]
                end = line.find(q, j + 3)
                if end == -1:
                    out += fg(C_GREEN, line[j:])
                    return out
                else:
                    out += fg(C_GREEN, line[j:end+len(q)])
                    j = end + len(q)
                    continue
            else:
                end = j + 1
                while end < n and line[end] != q:
                    if line[end] == '\\':
                        end += 1
                    end += 1
                out += fg(C_GREEN, line[j:end+1])
                j = end + 1
                continue
        elif ch.isalpha() or ch == '_':
            buf += ch
        elif ch.isdigit() and not buf:
            buf += ch
        elif ch.isdigit() and buf:
            buf += ch
        else:
            out += flush_buf(buf)
            buf = ""
            out += fg(C_WHITE, ch)
        j += 1
    out += flush_buf(buf)
    return out


#  Buffer: holds lines for one open file
class Buffer:
    def __init__(self, path=None):
        self.path = path
        self.lines = [""]
        self.cx = 0   # cursor col (char index)
        self.cy = 0   # cursor row (line index)
        self.scroll_y = 0
        self.scroll_x = 0
        self.modified = False
        self.name = os.path.basename(path) if path else "untitled"
        if path and os.path.exists(path):
            self.load()

    def load(self):
        try:
            with open(self.path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
            self.lines = content.split("\n")
            if not self.lines:
                self.lines = [""]
            self.modified = False
        except Exception as e:
            self.lines = [f"# Error loading file: {e}"]

    def save(self):
        if not self.path:
            return False
        try:
            os.makedirs(os.path.dirname(self.path), exist_ok=True) if os.path.dirname(self.path) else None
            with open(self.path, "w", encoding="utf-8") as f:
                f.write("\n".join(self.lines))
            self.modified = False
            return True
        except Exception:
            return False

    def cur_line(self):
        return self.lines[self.cy] if self.cy < len(self.lines) else ""

    def clamp_cx(self):
        self.cx = max(0, min(self.cx, len(self.cur_line())))

    def insert_char(self, ch):
        line = self.lines[self.cy]
        self.lines[self.cy] = line[:self.cx] + ch + line[self.cx:]
        self.cx += 1
        self.modified = True

    def delete_char(self):
        if self.cx > 0:
            line = self.lines[self.cy]
            self.lines[self.cy] = line[:self.cx-1] + line[self.cx:]
            self.cx -= 1
            self.modified = True
        elif self.cy > 0:
            prev = self.lines[self.cy - 1]
            self.cx = len(prev)
            self.lines[self.cy - 1] = prev + self.lines[self.cy]
            self.lines.pop(self.cy)
            self.cy -= 1
            self.modified = True

    def delete_forward(self):
        line = self.lines[self.cy]
        if self.cx < len(line):
            self.lines[self.cy] = line[:self.cx] + line[self.cx+1:]
            self.modified = True
        elif self.cy < len(self.lines) - 1:
            self.lines[self.cy] = line + self.lines[self.cy+1]
            self.lines.pop(self.cy + 1)
            self.modified = True

    def insert_newline(self):
        line = self.lines[self.cy]
        # Auto-indent: count leading spaces
        indent = len(line) - len(line.lstrip())
        # Extra indent after colon
        stripped = line.rstrip()
        if stripped.endswith(":"):
            indent += 4
        rest = line[self.cx:]
        self.lines[self.cy] = line[:self.cx]
        self.lines.insert(self.cy + 1, " " * indent + rest)
        self.cy += 1
        self.cx = indent
        self.modified = True

    def insert_tab(self):
        spaces = 4 - (self.cx % 4)
        for _ in range(spaces):
            self.insert_char(" ")

    def move_up(self):
        if self.cy > 0:
            self.cy -= 1
            self.clamp_cx()

    def move_down(self):
        if self.cy < len(self.lines) - 1:
            self.cy += 1
            self.clamp_cx()

    def move_left(self):
        if self.cx > 0:
            self.cx -= 1
        elif self.cy > 0:
            self.cy -= 1
            self.cx = len(self.cur_line())

    def move_right(self):
        line = self.cur_line()
        if self.cx < len(line):
            self.cx += 1
        elif self.cy < len(self.lines) - 1:
            self.cy += 1
            self.cx = 0

    def move_home(self):
        # Toggle between column 0 and first non-whitespace
        line = self.cur_line()
        first_nonws = len(line) - len(line.lstrip())
        if self.cx == first_nonws:
            self.cx = 0
        else:
            self.cx = first_nonws

    def move_end(self):
        self.cx = len(self.cur_line())

    def page_up(self, page_size):
        self.cy = max(0, self.cy - page_size)
        self.clamp_cx()

    def page_down(self, page_size):
        self.cy = min(len(self.lines) - 1, self.cy + page_size)
        self.clamp_cx()

    def adjust_scroll(self, view_rows, view_cols):
        # Vertical scroll
        if self.cy < self.scroll_y:
            self.scroll_y = self.cy
        elif self.cy >= self.scroll_y + view_rows:
            self.scroll_y = self.cy - view_rows + 1
        # Horizontal scroll
        if self.cx < self.scroll_x:
            self.scroll_x = self.cx
        elif self.cx >= self.scroll_x + view_cols:
            self.scroll_x = self.cx - view_cols + 1


#  File tree node
class FileTree:
    def __init__(self, root_path):
        self.root = root_path
        self.selected = 0
        self.entries = []
        self.expanded = set()
        self.scroll = 0
        self.refresh()

    def refresh(self):
        self.entries = []
        self._walk(self.root, 0)

    def _walk(self, path, depth):
        try:
            items = sorted(os.listdir(path), key=lambda x: (not os.path.isdir(os.path.join(path, x)), x.lower()))
            for item in items:
                if item.startswith(".") or item == "__pycache__":
                    continue
                full = os.path.join(path, item)
                is_dir = os.path.isdir(full)
                self.entries.append({
                    "path": full,
                    "name": item,
                    "depth": depth,
                    "is_dir": is_dir,
                    "expanded": full in self.expanded,
                })
                if is_dir and full in self.expanded:
                    self._walk(full, depth + 1)
        except PermissionError:
            pass

    def get_selected_path(self):
        if 0 <= self.selected < len(self.entries):
            return self.entries[self.selected]
        return None

    def toggle_selected(self):
        e = self.get_selected_path()
        if e and e["is_dir"]:
            if e["path"] in self.expanded:
                self.expanded.discard(e["path"])
            else:
                self.expanded.add(e["path"])
            self.refresh()
            return None
        return e["path"] if e else None


#  Output Panel
class OutputPanel:
    def __init__(self):
        self.lines = ["IDE Output Panel ready. Press ^R to run the current file."]
        self.visible = True
        self.scroll = 0

    def append(self, text):
        for line in text.split("\n"):
            self.lines.append(line)
        self.scroll = max(0, len(self.lines) - OUTPUT_H + 1)

    def clear(self):
        self.lines = []
        self.scroll = 0

    def run_file(self, path):
        self.clear()
        self.append(f"▶ Running: {os.path.basename(path)}\n{'─' * 30}")
        
        if is_web:
            f = io.StringIO()
            with contextlib.redirect_stdout(f), contextlib.redirect_stderr(f):
                try:
                    # Setup environment
                    old_path = sys.path[:]
                    old_cwd = os.getcwd()
                    
                    # Ensure /pyComputer is in path for imports
                    if "/pyComputer" not in sys.path:
                        sys.path.insert(0, "/pyComputer")
                    
                    # Set CWD to the file's directory
                    os.chdir(os.path.dirname(path) or "/")
                    
                    with open(path, 'r', encoding='utf-8') as file:
                        code = file.read()
                        # Execute in a clean global dict but with standard builtins
                        exec(code, {"__name__": "__main__", "__file__": path})
                    
                    # Restore environment
                    sys.path = old_path
                    os.chdir(old_cwd)
                except Exception:
                    print(traceback.format_exc())
            
            output_text = f.getvalue().rstrip()
            if output_text:
                self.append(output_text)
            self.append(f"\n✓ Execution finished")
            return

        try:
            result = subprocess.run(
                [sys.executable, path],
                capture_output=True, text=True, timeout=10
            )
            if result.stdout:
                self.append(result.stdout.rstrip())
            if result.stderr:
                self.append("── stderr ──\n" + result.stderr.rstrip())
            self.append(f"\n✓ Exited with code {result.returncode}")
        except subprocess.TimeoutExpired:
            self.append("✗ Timed out after 10 seconds")
        except FileNotFoundError:
            self.append("✗ Python interpreter not found")
        except Exception as e:
            self.append(f"✗ Error: {e}")


#  IDE Application
class IDE:
    def __init__(self, start_path=None):
        self.vfs = VFS()
        self.term_w = 120
        self.term_h = 35
        self._detect_term_size()

        # Root for file tree: prefer /root/usr/apps, fallback to cwd
        tree_root = self.vfs.abspath("/")
        if not os.path.isdir(tree_root):
            tree_root = os.getcwd()
        self.file_tree = FileTree(tree_root)
        self.output = OutputPanel()

        self.buffers = []
        self.active_tab = 0
        self.focus = "editor"  # "editor" | "filetree" | "output"
        self.show_help = False
        self.show_dialog = None  # None | {"type": "new_file", ...}
        self.dialog_input = ""
        self.status_msg = "Welcome to pyComputer IDE!"
        self.status_time = time.time()
        self.toolbar_buttons = [] # [(x1, x2, cmd_key)]

        # Open a start file if given, else open untitled
        if start_path:
            self.open_file(start_path)
        else:
            self.buffers.append(Buffer())

        self.dirty = True  # full redraw flag

    def _detect_term_size(self):
        try:
            import shutil
            size = shutil.get_terminal_size((120, 35))
            self.term_w = size.columns
            self.term_h = size.lines
        except Exception:
            pass
        self.term_w = max(80, self.term_w)
        self.term_h = max(24, self.term_h)

    # Geometry helpers
    def editor_rect(self):
        """Returns (x, y, w, h) 1-based for editor area."""
        x = FILETREE_W + 2
        y = TOOLBAR_H + 2  # 1-based, after toolbar + tab bar row
        w = self.term_w - FILETREE_W - 1
        output_rows = OUTPUT_H + 1 if self.output.visible else 0
        h = self.term_h - TOOLBAR_H - STATUSBAR_H - output_rows - 2  # -2 for tab bar
        return x, y, w, h

    def linenr_w(self):
        buf = self.active_buf()
        if buf is None:
            return 4
        return max(4, len(str(len(buf.lines))) + 1)

    def active_buf(self):
        if self.buffers and 0 <= self.active_tab < len(self.buffers):
            return self.buffers[self.active_tab]
        return None

    # File operations
    def open_file(self, path):
        for i, b in enumerate(self.buffers):
            if b.path == path:
                self.active_tab = i
                self.set_status(f"Switched to {os.path.basename(path)}")
                return
        buf = Buffer(path)
        self.buffers.append(buf)
        self.active_tab = len(self.buffers) - 1
        self.set_status(f"Opened {os.path.basename(path)}")
        self.dirty = True

    def close_tab(self, idx=None):
        if idx is None:
            idx = self.active_tab
        if not self.buffers:
            return
        self.buffers.pop(idx)
        if not self.buffers:
            self.buffers.append(Buffer())
        self.active_tab = min(self.active_tab, len(self.buffers) - 1)
        self.dirty = True

    def save_current(self):
        buf = self.active_buf()
        if buf is None:
            return
        if buf.path is None:
            self.show_dialog = {"type": "save_as"}
            self.dialog_input = ""
            return
        if buf.save():
            self.set_status(f"Saved {buf.name}")
        else:
            self.set_status("Save failed!")

    def run_current(self):
        buf = self.active_buf()
        if buf is None:
            return
        if buf.path is None or buf.modified:
            self.set_status("Save before running (^S)")
            return
        self.output.visible = True
        self.output.run_file(buf.path)
        self.set_status(f"Ran {buf.name}")
        self.dirty = True

    def set_status(self, msg):
        self.status_msg = msg
        self.status_time = time.time()

    # Rendering
    def render(self):
        out = []
        out.append("\033[?25l")  # hide cursor
        if self.dirty:
            out.append(clr_screen())
            self.dirty = False

        self._render_toolbar(out)
        self._render_tab_bar(out)
        self._render_file_tree(out)
        self._render_editor(out)
        if self.output.visible:
            self._render_output(out)
        self._render_status_bar(out)
        if self.show_help:
            self._render_help_overlay(out)
        if self.show_dialog:
            self._render_dialog(out)

        # Position real cursor in editor
        buf = self.active_buf()
        if buf and self.focus == "editor" and not self.show_dialog:
            ex, ey, ew, eh = self.editor_rect()
            lnw = self.linenr_w()
            screen_x = ex + lnw + (buf.cx - buf.scroll_x)
            screen_y = ey + (buf.cy - buf.scroll_y)
            out.append(goto(screen_x, screen_y))
            out.append("\033[?25h")  # show cursor

        sys.stdout.write("".join(out))
        sys.stdout.flush()

    def _fill_line(self, y, text, fg_c=C_WHITE, bg_c=C_BG, width=None):
        w = width or self.term_w
        plain = self._strip_ansi(text)
        pad = max(0, w - len(plain))
        return goto(1, y) + f"\033[38;5;{fg_c}m\033[48;5;{bg_c}m" + text + " " * pad + "\033[0m"

    def _strip_ansi(self, s):
        import re
        return re.sub(r'\033\[[0-9;]*m', '', s)

    def _render_toolbar(self, out):
        out.append(goto(1, 1))
        out.append(f"\033[48;5;{C_TOOLBAR}m")
        
        title_text = " ⌘ pyComputer IDE  "
        out.append(fgbg(C_WHITE, C_ACCENT, bold(title_text)))
        out.append("   ")
        
        x = len(title_text) + 4
        self.toolbar_buttons = []
        
        for k, v in HELP_KEYS[:6]:
            btn_text = f" {k} "
            desc_text = f" {v}"
            
            # Button (clickable)
            out.append(fgbg(C_TOOLBAR, C_ACCENT, btn_text))
            bw = len(btn_text)
            self.toolbar_buttons.append((x, x + bw - 1, k))
            x += bw
            
            # Description
            out.append(fg(C_MUTED, desc_text))
            dw = len(desc_text)
            x += dw
            
            out.append("  ")
            x += 2
            
        out.append(" " * max(0, self.term_w - x + 1))
        out.append("\033[0m")

    def _render_tab_bar(self, out):
        tab_y = TOOLBAR_H + 1
        out.append(goto(1, tab_y))
        out.append(f"\033[48;5;{C_TOOLBAR}m")
        x_offset = FILETREE_W + 2
        out.append(" " * x_offset)
        tabs_str = ""
        for i, buf in enumerate(self.buffers):
            label = buf.name + (" ●" if buf.modified else "")
            if i == self.active_tab:
                tab = fgbg(C_WHITE, C_TABACTIVE, f" {label} ")
            else:
                tab = fgbg(C_MUTED, C_TABINACT, f" {label} ")
            tabs_str += tab + " "
        plain_tabs = self._strip_ansi(tabs_str)
        total = x_offset + len(plain_tabs)
        out.append(tabs_str + " " * max(0, self.term_w - total))
        out.append("\033[0m")

    def _render_file_tree(self, out):
        tree_x = 1
        # Header
        header = fgbg(C_WHITE, C_ACCENT, bold(f" FILES {'─' * (FILETREE_W - 9)}"))
        out.append(goto(tree_x, TOOLBAR_H + 1))
        out.append(header[:FILETREE_W] + "\033[0m")

        # Entries
        _, ey, _, eh = self.editor_rect()
        output_rows = OUTPUT_H + 1 if self.output.visible else 0
        tree_h = self.term_h - TOOLBAR_H - STATUSBAR_H - output_rows - 1

        if self.file_tree.selected < self.file_tree.scroll:
            self.file_tree.scroll = self.file_tree.selected
        elif self.file_tree.selected >= self.file_tree.scroll + tree_h:
            self.file_tree.scroll = self.file_tree.selected - tree_h + 1

        for row in range(tree_h):
            y = TOOLBAR_H + 2 + row
            idx = self.file_tree.scroll + row
            if idx < len(self.file_tree.entries):
                e = self.file_tree.entries[idx]
                indent = "  " * e["depth"]
                if e["is_dir"]:
                    icon = "▼ " if e["expanded"] else "▶ "
                    name_text = icon + e["name"] + "/"
                    color = C_ACCENT
                else:
                    ext = os.path.splitext(e["name"])[1]
                    icons = {".py": "🐍", ".json": "{}", ".txt": "📄", ".md": "📝"}
                    icon = icons.get(ext, "  ")
                    name_text = icon + " " + e["name"]
                    color = C_WHITE
                line = indent + name_text
                line = line[:FILETREE_W - 1]
                pad = " " * max(0, FILETREE_W - 1 - len(line))
                if idx == self.file_tree.selected and self.focus == "filetree":
                    out.append(goto(tree_x, y) + fgbg(C_WHITE, C_SELECT, line + pad) + "\033[0m")
                else:
                    out.append(goto(tree_x, y) + f"\033[38;5;{color}m\033[48;5;{C_FILETREE}m" + line + pad + "\033[0m")
            else:
                out.append(goto(tree_x, y) + f"\033[48;5;{C_FILETREE}m" + " " * (FILETREE_W - 1) + "\033[0m")

        # Vertical divider
        for row in range(self.term_h - 2):
            out.append(goto(FILETREE_W + 1, 2 + row) + fg(C_MUTED, "│"))

    def _render_editor(self, out):
        buf = self.active_buf()
        ex, ey, ew, eh = self.editor_rect()
        lnw = self.linenr_w()
        code_w = ew - lnw - 1

        if buf is None:
            for row in range(eh):
                out.append(goto(ex, ey + row) + f"\033[48;5;{C_BG}m" + " " * ew + "\033[0m")
            msg = dim("No file open. Use ^N or click in the file tree.")
            out.append(goto(ex + 2, ey + eh // 2) + msg)
            return

        buf.adjust_scroll(eh, code_w)

        for row in range(eh):
            y = ey + row
            line_idx = buf.scroll_y + row
            out.append(goto(ex, y))

            if line_idx < len(buf.lines):
                # Line number
                lnum = str(line_idx + 1).rjust(lnw - 1) + " "
                if line_idx == buf.cy:
                    out.append(f"\033[38;5;{C_CURSOR}m\033[48;5;{C_SELECT}m{lnum}\033[0m")
                else:
                    out.append(f"\033[38;5;{C_LINENUM}m\033[48;5;{C_BG}m{lnum}\033[0m")

                # Code content
                raw_line = buf.lines[line_idx]
                visible = raw_line[buf.scroll_x:buf.scroll_x + code_w]

                # Highlight cursor line
                if line_idx == buf.cy:
                    out.append(f"\033[48;5;{C_SELECT}m")
                    highlighted = syntax_highlight_line(visible)
                    plain_len = len(self._strip_ansi(highlighted))
                    pad = " " * max(0, code_w - plain_len)
                    out.append(highlighted + pad + "\033[0m")
                else:
                    out.append(f"\033[48;5;{C_BG}m")
                    highlighted = syntax_highlight_line(visible)
                    plain_len = len(self._strip_ansi(highlighted))
                    pad = " " * max(0, code_w - plain_len)
                    out.append(highlighted + pad + "\033[0m")
            else:
                # Empty row
                out.append(f"\033[38;5;{C_MUTED}m\033[48;5;{C_BG}m" + " " * lnw + "~" + " " * (ew - lnw - 1) + "\033[0m")

    def _render_output(self, out):
        oy = self.term_h - STATUSBAR_H - OUTPUT_H
        ew = self.term_w - FILETREE_W - 1
        ex = FILETREE_W + 2

        # Header bar
        header = fgbg(C_WHITE, C_ACCENT, bold(f" OUTPUT {'─' * (ew - 10)}"))
        out.append(goto(ex, oy))
        out.append(header[:ew] + "\033[0m")

        for row in range(OUTPUT_H - 1):
            y = oy + 1 + row
            line_idx = self.output.scroll + row
            out.append(goto(ex, y) + f"\033[48;5;{C_OUTPUT}m")
            if line_idx < len(self.output.lines):
                line = self.output.lines[line_idx]
                # Color based on content
                if line.startswith("✓") or line.startswith("▶"):
                    colored = fg(C_GREEN, line)
                elif line.startswith("✗") or "Error" in line or "Traceback" in line:
                    colored = fg(C_RED, line)
                elif line.startswith("──") or line.startswith("─"):
                    colored = fg(C_MUTED, line)
                else:
                    colored = fg(C_WHITE, line)
                plain_len = len(self._strip_ansi(colored))
                pad = " " * max(0, ew - 1 - plain_len)
                out.append(colored[:ew-1] + pad + "\033[0m")
            else:
                out.append(" " * (ew - 1) + "\033[0m")

    def _render_status_bar(self, out):
        buf = self.active_buf()
        sy = self.term_h

        if buf:
            pos = f"Ln {buf.cy+1}, Col {buf.cx+1}"
            encoding = "UTF-8"
            lang = "Python" if (buf.path or "").endswith(".py") else "Plain"
            modified_indicator = dim(" ●") if buf.modified else ""
            path_info = (buf.path or "untitled") + modified_indicator
            right = f" {lang}  {encoding}  {pos} "
        else:
            path_info = ""
            right = ""

        # Status message (fades after 3 seconds)
        msg_age = time.time() - self.status_time
        if msg_age < 3:
            msg = f"  {self.status_msg}"
        else:
            msg = f"  {path_info}"

        focus_ind = f" [{self.focus.upper()}] "
        right_str = focus_ind + right
        plain_msg = self._strip_ansi(msg)
        plain_right = self._strip_ansi(right_str)
        pad = max(0, self.term_w - len(plain_msg) - len(plain_right))

        out.append(goto(1, sy))
        out.append(f"\033[48;5;{C_STATUS}m\033[38;5;{C_ACCENT}m" + msg)
        out.append(f"\033[38;5;{C_MUTED}m" + " " * pad)
        out.append(f"\033[38;5;{C_WHITE}m" + right_str + "\033[0m")

    def _render_help_overlay(self, out):
        hw, hh = 42, len(HELP_KEYS) + 6
        hx = (self.term_w - hw) // 2
        hy = (self.term_h - hh) // 2
        border_top = "╔" + "═" * (hw - 2) + "╗"
        border_bot = "╚" + "═" * (hw - 2) + "╝"
        
        # Fixed centering calculation by stripping ANSI or manual padding
        title_text = " ⌘  Keyboard Shortcuts "
        pad_l = (hw - 2 - len(title_text)) // 2
        pad_r = hw - 2 - len(title_text) - pad_l
        title = "║" + " " * pad_l + bold(title_text) + " " * pad_r + "║"

        out.append(goto(hx, hy) + fgbg(C_WHITE, C_TOOLBAR, border_top))
        out.append(goto(hx, hy+1) + fgbg(C_WHITE, C_TOOLBAR, title))
        out.append(goto(hx, hy+2) + fgbg(C_MUTED, C_TOOLBAR, "║" + "─" * (hw-2) + "║"))
        for i, (k, v) in enumerate(HELP_KEYS):
            row = hy + 3 + i
            content = f"  {fgbg(C_WHITE, C_ACCENT, f' {k} ')}  {fg(C_WHITE, v)}"
            plain = f"   {k}    {v}"
            pad = " " * max(0, hw - 2 - len(plain))
            out.append(goto(hx, row) + f"\033[48;5;{C_TOOLBAR}m║" + content + pad + f"\033[48;5;{C_TOOLBAR}m║\033[0m")
        out.append(goto(hx, hy+3+len(HELP_KEYS)) + fgbg(C_MUTED, C_TOOLBAR, "║" + "─" * (hw-2) + "║"))
        out.append(goto(hx, hy+4+len(HELP_KEYS)) + fgbg(C_MUTED, C_TOOLBAR, "║" + dim("  Press any key to close").ljust(hw-2+9) + "║"))
        out.append(goto(hx, hy+5+len(HELP_KEYS)) + fgbg(C_WHITE, C_TOOLBAR, border_bot))

    def _render_dialog(self, out):
        d = self.show_dialog
        if d is None:
            return
        dtype = d.get("type")
        if dtype in ("save_as", "new_file"):
            prompt = "Save as (path):" if dtype == "save_as" else "New file path:"
            dw, dh = 50, 5
            dx = (self.term_w - dw) // 2
            dy = (self.term_h - dh) // 2
            out.append(goto(dx, dy) + fgbg(C_WHITE, C_ACCENT, "╔" + "═" * (dw-2) + "╗"))
            title_line = f"  {prompt}  "
            out.append(goto(dx, dy+1) + fgbg(C_WHITE, C_TOOLBAR, "║" + bold(title_line).center(dw-2+9) + "║"))
            inp_display = self.dialog_input + "█"
            inp_line = f"  {inp_display}"
            pad = " " * max(0, dw - 2 - len(inp_display) - 2)
            out.append(goto(dx, dy+2) + fgbg(C_WHITE, C_BG, "║" + inp_line + pad + f"\033[48;5;{C_BG}m║\033[0m"))
            out.append(goto(dx, dy+3) + fgbg(C_MUTED, C_TOOLBAR, "║" + dim("  Enter: confirm   Esc: cancel").ljust(dw-2+9) + "║"))
            out.append(goto(dx, dy+4) + fgbg(C_WHITE, C_ACCENT, "╚" + "═" * (dw-2) + "╝"))

    # Input handling
    def handle_key(self, key):
        if not key:
            return

        if key.startswith("\x1b[<"):
            self._handle_mouse(key)
            return

        if self.show_help:
            self.show_help = False
            self.dirty = True
            return

        if self.show_dialog:
            self._handle_dialog_key(key)
            return

        # Safe Ctrl-key global shortcuts for Web
        if key == "\x18":  # Ctrl-X (Quit)
            return "quit"
        if key == "\x13":  # Ctrl-S (Save)
            self.save_current()
            self.dirty = True
            return
        if key == "\x05":  # Ctrl-E (Run/Execute)
            self.run_current()
            return
        if key == "\x07":  # Ctrl-G (New)
            self.show_dialog = {"type": "new_file"}
            self.dialog_input = ""
            self.dirty = True
            return
        if key == "\x0b":  # Ctrl-K (Close Tab)
            self.close_tab()
            return
        if key == "\x02":  # Ctrl-B (Toggle Output)
            self.output.visible = not self.output.visible
            self.dirty = True
            return
        
        if key == "\x1bOP" or key == "\x1b[11~":  # F1
            self.show_help = True
            self.dirty = True
            return
        if key == "\x1b[Z":  # Shift-Tab: cycle focus
            self._cycle_focus(-1)
            return
        if key == "\t" and self.focus != "editor":
            self._cycle_focus(1)
            return
        if key == "\x1b\t":  # Alt-Tab: cycle focus forward
            self._cycle_focus(1)
            return

        # Ctrl-Tab / Ctrl-Shift-Tab for tabs
        if key == "\x1b[1;5I":  # Ctrl-Tab (some terms)
            self.active_tab = (self.active_tab + 1) % max(1, len(self.buffers))
            self.dirty = True
            return

        # Dispatch by focus
        if self.focus == "editor":
            self._handle_editor_key(key)
        elif self.focus == "filetree":
            self._handle_tree_key(key)
        elif self.focus == "output":
            self._handle_output_key(key)

    def _handle_mouse(self, seq):
        # SGR mouse: \x1b[<btn;x;yM (press) or m (release)
        if not seq.endswith("M"):
            return
        try:
            parts = seq[3:-1].split(";")
            btn = int(parts[0])
            x = int(parts[1])
            y = int(parts[2])
            
            if btn == 0: # Left click
                if y == 1:
                    for x1, x2, k in self.toolbar_buttons:
                        if x1 <= x <= x2:
                            # Map to Ctrl keys
                            mapping = {
                                "^S": "\x13", "^E": "\x05", "^G": "\x07",
                                "^K": "\x0b", "^X": "\x18", "F1": "\x1bOP"
                            }
                            if k in mapping:
                                self.handle_key(mapping[k])
                            return
                
                # Simple focus switching by click
                if y == TOOLBAR_H + 1: # Tab bar / Tree header
                    if x <= FILETREE_W:
                        self.focus = "filetree"
                    else:
                        # Tab selection
                        self.focus = "editor"
                    self.dirty = True
                elif y > TOOLBAR_H + 1:
                    if x <= FILETREE_W:
                        self.focus = "filetree"
                    else:
                        # Check if it's in output or editor
                        output_oy = self.term_h - STATUSBAR_H - OUTPUT_H
                        if self.output.visible and y >= output_oy:
                            self.focus = "output"
                        else:
                            self.focus = "editor"
                    self.dirty = True
        except:
            pass

    def _cycle_focus(self, direction):
        zones = ["filetree", "editor"]
        if self.output.visible:
            zones.append("output")
        idx = zones.index(self.focus) if self.focus in zones else 0
        self.focus = zones[(idx + direction) % len(zones)]
        self.set_status(f"Focus: {self.focus}")
        self.dirty = True

    def _handle_editor_key(self, key):
        buf = self.active_buf()
        if buf is None:
            return

        if key == Key.UP:       buf.move_up()
        elif key == Key.DOWN:   buf.move_down()
        elif key == Key.LEFT:   buf.move_left()
        elif key == Key.RIGHT:  buf.move_right()
        elif key == Key.HOME or key == "\x01":   buf.move_home()
        elif key == Key.END:                     buf.move_end() # Removed \x05 conflict
        elif key == Key.PAGE_UP:   buf.page_up(10)
        elif key == Key.PAGE_DOWN: buf.page_down(10)
        elif key == Key.BACKSPACE: buf.delete_char()
        elif key == Key.DELETE:    buf.delete_forward()
        elif key in ("\r", "\n"): buf.insert_newline()
        elif key == "\t":          buf.insert_tab()
        elif len(key) == 1 and ord(key) >= 32:
            buf.insert_char(key)
        # else ignore control chars

    def _handle_tree_key(self, key):
        if key == Key.UP:
            self.file_tree.selected = max(0, self.file_tree.selected - 1)
        elif key == Key.DOWN:
            self.file_tree.selected = min(len(self.file_tree.entries) - 1, self.file_tree.selected + 1)
        elif key in ("\r", "\n", " "):
            path = self.file_tree.toggle_selected()
            if path and os.path.isfile(path):
                self.open_file(path)
                self.focus = "editor"
        elif key == Key.RIGHT:
            e = self.file_tree.get_selected_path()
            if e and e["is_dir"]:
                self.file_tree.expanded.add(e["path"])
                self.file_tree.refresh()
        elif key == Key.LEFT:
            e = self.file_tree.get_selected_path()
            if e and e["is_dir"]:
                self.file_tree.expanded.discard(e["path"])
                self.file_tree.refresh()
        self.dirty = True

    def _handle_output_key(self, key):
        if key == Key.UP:
            self.output.scroll = max(0, self.output.scroll - 1)
        elif key == Key.DOWN:
            self.output.scroll = min(
                max(0, len(self.output.lines) - OUTPUT_H + 1),
                self.output.scroll + 1
            )
        elif key == "\x02":  # Ctrl-B
            self.output.visible = False
            self.focus = "editor"
        self.dirty = True

    def _handle_dialog_key(self, key):
        d = self.show_dialog
        if key == "\x1b":  # Escape
            self.show_dialog = None
            self.dialog_input = ""
            self.dirty = True
        elif key in ("\r", "\n") and self.dialog_input.strip():
            path = self.dialog_input.strip()
            if not os.path.isabs(path):
                path = os.path.join(self.vfs.root, path)
            if d["type"] == "new_file":
                buf = Buffer(path)
                self.buffers.append(buf)
                self.active_tab = len(self.buffers) - 1
                self.set_status(f"New file: {os.path.basename(path)}")
            elif d["type"] == "save_as":
                buf = self.active_buf()
                if buf:
                    buf.path = path
                    buf.name = os.path.basename(path)
                    buf.save()
                    self.set_status(f"Saved as {buf.name}")
            self.show_dialog = None
            self.dialog_input = ""
            self.file_tree.refresh()
            self.dirty = True
        elif key == Key.BACKSPACE:
            self.dialog_input = self.dialog_input[:-1]
            self.dirty = True
        elif len(key) == 1 and ord(key) >= 32:
            self.dialog_input += key
            self.dirty = True

    # Main loop
    def run(self):
        old = setup_raw()
        try:
            # Enable mouse tracking (SGR mode)
            sys.stdout.write("\033[?1000h\033[?1006h")
            sys.stdout.write(clr_screen())
            sys.stdout.flush()
            self.dirty = True
            self.render()
            last_render = time.time()
            while True:
                key = get_key()
                if key is not None:
                    result = self.handle_key(key)
                    if result == "quit":
                        break

                now = time.time()
                if now - last_render > 0.05:
                    self.render()
                    last_render = now

                time.sleep(0.01)
        finally:
            # Disable mouse tracking
            sys.stdout.write("\033[?1006l\033[?1000l")
            restore(old)
            sys.stdout.write("\033[?25h")
            cleanup()


#  Entry point
def main(*args):
    start_path = args[0] if args else None
    if start_path:
        vfs = VFS()
        start_path = vfs.abspath(start_path)
    ide = IDE(start_path=start_path)
    ide.run()
