"""
Calculator app entrypoint for pyComputer
"""

def main(*args):
    print("[calculator] Welcome to Calculator!")
    expr = input("Enter an expression (e.g. 2 + 2): ")
    try:
        result = eval(expr, {"__builtins__": {}})
        print(f"Result: {result}")
    except Exception as e:
        print(f"Error: {e}")
