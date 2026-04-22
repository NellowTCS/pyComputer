"""
opfs.py: Persistent storage: file-based fallback for browser OPFS.
"""

import os
import json
from typing import Optional, Any


class OPFS:
    def __init__(self, base_path: str = ".opfs"):
        self.base_path = base_path
        os.makedirs(base_path, exist_ok=True)

    def _get_path(self, path: str) -> str:
        return os.path.join(self.base_path, path.lstrip("/"))

    def write(self, path: str, data: str) -> bool:
        try:
            full_path = self._get_path(path)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "w") as f:
                f.write(data)
            return True
        except Exception:
            return False

    def read(self, path: str) -> Optional[str]:
        try:
            with open(self._get_path(path), "r") as f:
                return f.read()
        except Exception:
            return None

    def delete(self, path: str) -> bool:
        try:
            os.remove(self._get_path(path))
            return True
        except Exception:
            return False

    def exists(self, path: str) -> bool:
        return os.path.exists(self._get_path(path))

    def listdir(self, path: str = "") -> list[str]:
        try:
            full = os.path.join(self.base_path, path.lstrip("/"))
            if not os.path.isdir(full):
                return []
            return os.listdir(full)
        except Exception:
            return []

    def mkdir(self, path: str) -> bool:
        try:
            os.makedirs(self._get_path(path), exist_ok=True)
            return True
        except Exception:
            return False

    def write_json(self, path: str, data: Any) -> bool:
        return self.write(path, json.dumps(data, indent=2))

    def read_json(self, path: str) -> Optional[Any]:
        data = self.read(path + ".json")
        if data is None:
            return None
        try:
            return json.loads(data)
        except Exception:
            return None


_default = OPFS()


def write(path: str, data: str) -> bool:
    return _default.write(path, data)


def read(path: str) -> Optional[str]:
    return _default.read(path)


def delete(path: str) -> bool:
    return _default.delete(path)


def exists(path: str) -> bool:
    return _default.exists(path)


def listdir(path: str = "") -> list[str]:
    return _default.listdir(path)


def mkdir(path: str) -> bool:
    return _default.mkdir(path)
