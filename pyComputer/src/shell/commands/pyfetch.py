"""
pyfetch: Python/pyComputer system info and ASCII art (neofetch clone)
thanks to https://github.com/o2sh/onefetch for the python ascii :3
"""

import platform
import sys
import os
from src.stdlib.appstdlib import info, banner

# ANSI color codes
BLUE = "\033[34m"
YELLOW = "\033[33m"
RESET = "\033[0m"

PYTHON_ASCII = f"""
{BLUE}               =========
{BLUE}            ===============
{BLUE}           =================
{BLUE}          ===  ==============
{BLUE}          ===================
{BLUE}                   ==========
{BLUE}   ========================== {YELLOW}=======
{BLUE} ============================ {YELLOW}========
{BLUE}============================= {YELLOW}=========
{BLUE}============================ {YELLOW}==========
{BLUE}========================== {YELLOW}============
{BLUE}============ {YELLOW}==========================
{BLUE}========== {YELLOW}============================
{BLUE}========= {YELLOW}=============================
{BLUE} ======== {YELLOW}============================
{BLUE}  ======= {YELLOW}==========================
{YELLOW}          ==========
{YELLOW}          ===================
{YELLOW}          ==============  ===
{YELLOW}           =================
{YELLOW}            ===============
{YELLOW}               ========={RESET}
"""

def get_mem():
    # Web: Use navigator.deviceMemory if available
    try:
        import js
        ram = getattr(js.navigator, "deviceMemory", None)
        if ram:
            return f"{ram} GiB"
    except Exception:
        pass

    # Linux: /proc/meminfo
    if sys.platform.startswith("linux"):
        try:
            with open("/proc/meminfo") as f:
                for line in f:
                    if line.startswith("MemTotal:"):
                        kb = int(line.split()[1])
                        return f"{kb // 1024} MB"
        except Exception:
            pass

    # macOS: sysctl
    if sys.platform == "darwin":
        try:
            import subprocess
            out = subprocess.check_output(["sysctl", "-n", "hw.memsize"])
            bytes_ = int(out.strip())
            return f"{bytes_ // (1024*1024)} MB"
        except Exception:
            pass

    # Windows: ctypes
    if sys.platform.startswith("win"):
        try:
            import ctypes
            class MEMORYSTATUSEX(ctypes.Structure):
                _fields_ = [
                    ("dwLength", ctypes.c_ulong),
                    ("dwMemoryLoad", ctypes.c_ulong),
                    ("ullTotalPhys", ctypes.c_ulonglong),
                    ("ullAvailPhys", ctypes.c_ulonglong),
                    ("ullTotalPageFile", ctypes.c_ulonglong),
                    ("ullAvailPageFile", ctypes.c_ulonglong),
                    ("ullTotalVirtual", ctypes.c_ulonglong),
                    ("ullAvailVirtual", ctypes.c_ulonglong),
                    ("sullAvailExtendedVirtual", ctypes.c_ulonglong),
                ]
            stat = MEMORYSTATUSEX()
            stat.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(stat))
            return f"{stat.ullTotalPhys // (1024*1024)} MB"
        except Exception:
            pass

    return "?"

def cmd_pyfetch(shell, *args):
    banner("pyfetch")
    print(PYTHON_ASCII)
    info(f"User: {os.getenv('USER') or os.getenv('USERNAME') or '?'}")
    info(f"OS: {platform.system()} {platform.release()}")
    info(f"Python: {platform.python_version()} ({platform.python_implementation()})")
    info(f"Platform: {platform.platform()}")
    info(f"Machine: {platform.machine()}")
    info(f"Memory: {get_mem()}")
    info(f"Shell: pyComputer")
    info(f"Executable: {sys.executable}")
