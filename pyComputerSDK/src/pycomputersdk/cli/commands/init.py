import os

MANIFEST_JSON = """\
{{
    "name": "{name}",
    "version": "0.1.0",
    "entry": "main.py",
    "permissions": [],
    "description": ""
}}
"""

MAIN_PY = """\
from pycomputersdk import Renderer, get_key, Key
from pycomputersdk.std import info


def main():
    r = Renderer()
    r.clear()
    info("Hello from {name}!")

    while True:
        key = get_key()
        if key == Key.ESC:
            break

    r.clear()
    r.show_cursor()


if __name__ == "__main__":
    main()
"""

TEST_MAIN_PY = """\
from pycomputersdk.testing import MockRenderer, MockInput, assert_screen

from {name} import main


def test_placeholder():
    assert True
"""


def cmd_init(name: str) -> int:
    if not name.isidentifier():
        print(f"Error: '{name}' is not a valid Python identifier")
        return 1

    dst = os.path.join(os.getcwd(), name)
    if os.path.exists(dst):
        print(f"Error: '{dst}' already exists")
        return 1

    os.makedirs(os.path.join(dst, "tests"))

    with open(os.path.join(dst, "manifest.json"), "w") as f:
        f.write(MANIFEST_JSON.format(name=name))

    with open(os.path.join(dst, "main.py"), "w") as f:
        f.write(MAIN_PY.format(name=name))

    with open(os.path.join(dst, "tests", "test_main.py"), "w") as f:
        f.write(TEST_MAIN_PY.format(name=name))

    print(f"Created app '{name}' at {dst}")
    print(f"  cd {name}")
    print(f"  pycomp validate .")
    print(f"  pycomp run .")
    print(f"  pycomp build .")
    return 0
