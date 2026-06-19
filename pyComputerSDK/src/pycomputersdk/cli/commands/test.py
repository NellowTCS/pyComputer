import os
import sys


def cmd_test(path: str, pytest_args: list[str] | None = None) -> int:
    app_dir = os.path.abspath(path)

    if not os.path.isdir(app_dir):
        print(f"Error: directory not found: {app_dir}")
        return 1

    tests_dir = os.path.join(app_dir, "tests")
    if not os.path.isdir(tests_dir):
        print(f"No tests/ directory found in {app_dir}")
        return 1

    import pytest

    args = [tests_dir]
    if pytest_args:
        args.extend(pytest_args)

    sys.path.insert(0, app_dir)
    try:
        return pytest.main(args)
    finally:
        sys.path.remove(app_dir)
