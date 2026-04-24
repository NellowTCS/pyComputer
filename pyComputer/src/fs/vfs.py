"""
VFS: High-level FS API, path normalization, directory creation (real implementation).
"""

import os
import shutil

from src.utils.platform import is_web


class VFS:
    def __init__(self, root=None):
        if root is None:
            repo_root = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "../../../root")
            )
            if is_web():
                web_root = "/root"
                pycomputer_root = "/pyComputer/root"
                if os.path.exists(web_root):
                    self.root = web_root
                elif os.path.exists(pycomputer_root):
                    self.root = pycomputer_root
                else:
                    self.root = repo_root
            else:
                self.root = repo_root
        else:
            self.root = os.path.abspath(root)

    def abspath(self, path):
        if path == "/" or path == "":
            return self.root
        if os.path.isabs(path):
            return os.path.join(self.root, path.lstrip("/"))
        return os.path.abspath(os.path.join(self.root, path))

    def open(self, path, mode="r"):
        return open(self.abspath(path), mode)

    def read(self, path):
        with self.open(path, "r") as f:
            return f.read()

    def write(self, path, data):
        with self.open(path, "w") as f:
            f.write(data)

    def listdir(self, path="."):
        return os.listdir(self.abspath(path))

    def exists(self, path):
        return os.path.exists(self.abspath(path))

    def mkdir(self, path):
        os.makedirs(self.abspath(path), exist_ok=True)

    def remove(self, path):
        abs_path = self.abspath(path)
        if os.path.isdir(abs_path):
            shutil.rmtree(abs_path)
        else:
            os.remove(abs_path)

    def move(self, src, dst):
        shutil.move(self.abspath(src), self.abspath(dst))
