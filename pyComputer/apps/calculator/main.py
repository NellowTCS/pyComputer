"""
Calculator app entrypoint for pyComputer
"""
from src.ui.renderer import Renderer

def main(*args):
    r = Renderer()
    r.banner("Calculator")
    expr = input("Enter an expression (e.g. 2 + 2): ")
    try:
        result = eval(expr, {"__builtins__": {}})
        r.success(f"Result: {result}")
    except Exception as e:
        r.error(f"Error: {e}")
