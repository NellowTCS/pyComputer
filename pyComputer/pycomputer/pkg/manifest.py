"""
manifest.py: Manifest schema and validation for pyComputer apps.
"""

import json

REQUIRED_FIELDS = {
	"name": str,
	"version": str,
	"entry": str,
	"description": str,
	"permissions": list,
}

class ManifestError(Exception):
	pass

class Manifest:
	def __init__(self, data):
		self.data = data
		self.validate()

	@classmethod
	def from_file(cls, path):
		with open(path, "r", encoding="utf-8") as f:
			data = json.load(f)
		return cls(data)

	def validate(self):
		for field, typ in REQUIRED_FIELDS.items():
			if field not in self.data:
				raise ManifestError(f"Missing required field: {field}")
			if not isinstance(self.data[field], typ):
				raise ManifestError(f"Field '{field}' must be {typ.__name__}")
		if not self.data["entry"].endswith(".py"):
			raise ManifestError("'entry' must be a .py file")
		# Permissions must be a list of strings
		if not all(isinstance(p, str) for p in self.data["permissions"]):
			raise ManifestError("All permissions must be strings")

	def get(self, key, default=None):
		return self.data.get(key, default)
