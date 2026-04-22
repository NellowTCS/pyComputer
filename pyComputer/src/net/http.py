"""
http.py: Networking layer, get/post, JSON helpers, cache
"""

try:
    import requests
except ImportError:
    requests = None
import json


class HTTP:
    def get(self, url):
        if requests:
            try:
                resp = requests.get(url)
                resp.raise_for_status()
                return resp.text
            except Exception as e:
                print(f"[net] GET error: {e}")
                return None
        print(f"[net] GET {url} (requests not installed)")
        return None

    def post(self, url, data=None):
        if requests:
            try:
                resp = requests.post(url, data=data)
                resp.raise_for_status()
                return resp.text
            except Exception as e:
                print(f"[net] POST error: {e}")
                return None
        print(f"[net] POST {url} (requests not installed)")
        return None

    def get_json(self, url):
        text = self.get(url)
        if text:
            try:
                return json.loads(text)
            except Exception as e:
                print(f"[net] JSON decode error: {e}")
        return None
