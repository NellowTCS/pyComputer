import os
import sys
import json


def cmd_run(path: str, app_args: list[str] | None = None) -> int:
    app_dir = os.path.abspath(path)

    if not os.path.isdir(app_dir):
        print(f"Error: directory not found: {app_dir}")
        return 1

    manifest_path = os.path.join(app_dir, "manifest.json")
    if not os.path.isfile(manifest_path):
        print(f"Error: manifest.json not found in {app_dir}")
        return 1

    with open(manifest_path) as f:
        manifest = json.load(f)

    app_name = manifest.get("name", os.path.basename(app_dir))

    pyc_dir = os.path.join(os.path.dirname(app_dir), ".pyc")
    data_dir = os.path.join(pyc_dir, "data")

    if not os.path.isdir(data_dir):
        print(f"[pyc] Initializing data disk at {data_dir}...")
        os.makedirs(os.path.join(data_dir, "boot"), exist_ok=True)
        os.makedirs(os.path.join(data_dir, "sys"), exist_ok=True)
        os.makedirs(os.path.join(data_dir, "usr/apps"), exist_ok=True)
        with open(os.path.join(data_dir, "sys/apps.json"), "w") as f:
            json.dump([], f)

    os.environ["PYCOMPUTER_DATA_DIR"] = data_dir
    os.environ["PYCOMPUTER_ROOT_DIR"] = os.path.join(pyc_dir, "root")

    from pycomputer.kernel.loader import Loader
    from pycomputer.stdlib.appstdlib import set_theme

    theme = manifest.get("theme", "default")
    set_theme(theme)

    loader = Loader()
    main_fn = loader.import_from_path(app_dir)

    if not main_fn or not callable(main_fn):
        print(f"Error: failed to load app '{app_name}' from {app_dir}")
        return 1

    args = list(app_args) if app_args else []
    try:
        main_fn(*args)
    except (KeyboardInterrupt, SystemExit):
        pass
    except Exception as e:
        print(f"Error running '{app_name}': {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0
