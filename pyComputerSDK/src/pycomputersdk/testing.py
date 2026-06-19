class MockRenderer:
    def __init__(self):
        self._buffer = []
        self._cursor_x = 1
        self._cursor_y = 1
        self._output = []

    def clear(self):
        self._output = []
        self._cursor_x = 1
        self._cursor_y = 1
        return self

    def clear_line(self):
        return self

    def move(self, x, y):
        self._cursor_x = x
        self._cursor_y = y
        return self

    def write(self, text):
        self._output.append(text)
        return self

    def flush(self):
        return self

    def hide_cursor(self):
        return self

    def show_cursor(self):
        return self

    def bold(self, text):
        return text

    def dim(self, text):
        return text

    def green(self, text):
        return text

    def bright_green(self, text):
        return text

    def red(self, text):
        return text

    def bright_red(self, text):
        return text

    def yellow(self, text):
        return text

    def cyan(self, text):
        return text

    def bright_cyan(self, text):
        return text

    def box(self, width, height, title=None):
        return ""

    def box_at(self, x, y, width, height, title=None):
        return self

    def capture(self):
        return "".join(self._output)

    def capture_lines(self):
        return list(self._output)


class MockInput:
    def __init__(self, keys=None):
        self._keys = list(keys or [])
        self._index = 0

    def get_key(self):
        if self._index < len(self._keys):
            key = self._keys[self._index]
            self._index += 1
            return key
        return None

    def feed(self, key):
        self._keys.append(key)

    def remaining(self):
        return len(self._keys) - self._index


def assert_screen(mock_renderer, *expected_lines):
    lines = mock_renderer.capture_lines()
    if lines != list(expected_lines):
        import difflib
        diff = "\n".join(
            difflib.ndiff(
                [l + "\n" for l in expected_lines],
                [l + "\n" for l in lines],
            )
        )
        raise AssertionError(f"Screen mismatch:\n{diff}")
