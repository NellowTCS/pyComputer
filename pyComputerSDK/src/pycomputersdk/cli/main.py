import sys
import argparse


def main():
    parser = argparse.ArgumentParser(
        prog="pycomp",
        description="pyComputer app developer tool",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="Scaffold a new app project")
    init_parser.add_argument("name", help="App name")

    build_parser = subparsers.add_parser("build", help="Build a .pycapp archive")
    build_parser.add_argument("path", nargs="?", default=".", help="App directory")
    build_parser.add_argument("--output", "-o", default=None, help="Output path or filename")

    val_parser = subparsers.add_parser("validate", help="Validate app manifest")
    val_parser.add_argument("path", nargs="?", default=".", help="App directory")

    test_parser = subparsers.add_parser("test", help="Run app tests with pytest")
    test_parser.add_argument("path", nargs="?", default=".", help="App directory")
    test_parser.add_argument("pytest_args", nargs=argparse.REMAINDER, help="Extra pytest flags")

    run_parser = subparsers.add_parser("run", help="Run an app in a full kernel environment")
    run_parser.add_argument("path", help="App directory")
    run_parser.add_argument("app_args", nargs=argparse.REMAINDER, help="Arguments to forward to the app")

    args = parser.parse_args()

    if args.command == "init":
        from .commands.init import cmd_init
        return cmd_init(args.name)
    elif args.command == "build":
        from .commands.build import cmd_build
        return cmd_build(args.path, output=args.output)
    elif args.command == "validate":
        from .commands.validate import cmd_validate
        return cmd_validate(args.path)
    elif args.command == "test":
        from .commands.test import cmd_test
        return cmd_test(args.path, args.pytest_args)
    elif args.command == "run":
        from .commands.run import cmd_run
        return cmd_run(args.path, args.app_args)

    return 1


if __name__ == "__main__":
    sys.exit(main())
