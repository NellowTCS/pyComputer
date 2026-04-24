import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { FILES } from './pycomputer_bundled.js';

async function loadPyodide() {
  const { loadPyodide } = await import('https://cdn.jsdelivr.net/npm/pyodide@0.29.3/+esm');
  return loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/npm/pyodide@0.29.3/"
  });
}

const statusEl = document.getElementById("status");
const termEl = document.getElementById("terminal");

const term = new Terminal({
  cursorBlink: true,
  cursorStyle: "block",
  fontSize: 14,
  fontFamily: "'Fira Code', 'Consolas', monospace",
  theme: {
    background: "#0a0a0a",
    foreground: "#00ff41",
    cursor: "#00ff41",
    selection: "rgba(0, 255, 65, 0.3)"
  }
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(termEl);
fitAddon.fit();

window.addEventListener("resize", () => fitAddon.fit());

window.termWrite = (data) => {
  const normalized = data
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n/g, "\r\n");
  term.write(normalized);
};

let pyodide = null;
let inputQueue = [];
let currentLine = "";
let resolveLine = null;

function enqueueLine(line) {
  if (resolveLine) {
    resolveLine(line);
    resolveLine = null;
  } else {
    inputQueue.push(line);
  }
}

function getLine() {
  if (inputQueue.length > 0) {
    return Promise.resolve(inputQueue.shift());
  }
  return new Promise((resolve) => {
    resolveLine = resolve;
  });
}

term.onData((data) => {
  for (const ch of data) {
    if (ch === "\r") {
      term.write("\r\n");
      enqueueLine(currentLine);
      currentLine = "";
    } else if (ch === "\u007f") {
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        term.write("\b \b");
      }
    } else if (ch === "\u0003") {
      term.write("^C\r\n");
      enqueueLine("exit");
      currentLine = "";
    } else {
      currentLine += ch;
      term.write(ch);
    }
  }
});

term.write("\x1b[2J\x1b[1;1HLoading pyComputer...\n");

async function run() {
  pyodide = await loadPyodide();
  
  statusEl.textContent = "Ready";
  statusEl.className = "ready";
  
  term.write("\r\n");
  
  // Build Python code that writes each file and initializes the kernel
  let code = `import os
import json
import js
import sys

class TermIO:
    def write(self, data):
        js.termWrite(data)
    def flush(self):
        pass

sys.stdout = TermIO()
sys.stderr = TermIO()

# Files data from JS
FILES = ${JSON.stringify(FILES)}

# Ensure base directories exist
try:
    os.makedirs('/pyComputer', exist_ok=True)
    os.makedirs('/root', exist_ok=True)
except:
    pass

# Extract files
for filepath, content in FILES.items():
    if filepath.startswith('src/'):
        target_path = '/pyComputer/' + filepath
    else:
        target_path = '/root/' + filepath
    dir = os.path.dirname(target_path)
    if dir:
        try: os.makedirs(dir, exist_ok=True)
        except: pass
    with open(target_path, 'w') as f:
        f.write(content)

print(f"Extracted {len(FILES)} files")

sys.path.insert(0, '/pyComputer')

from src.kernel.kernel import Kernel
kernel = Kernel()
kernel.initialize()
kernel.boot_sequence()
shell = kernel.shell
`;
  
  await pyodide.runPythonAsync(code);

  const prompt = "[/] $ ";
  term.write(prompt);

  async function handleLine(line) {
    const trimmed = line.trim();
    if (!trimmed) {
      term.write(prompt);
      return;
    }

    pyodide.globals.set("commandLine", line);
    try {
      await pyodide.runPythonAsync("shell.execute(commandLine)");
    } catch (e) {
      // SystemExit from the shell should stop interactive input silently.
      if (String(e).includes("SystemExit")) {
        term.write("Shell exited.\r\n");
        return;
      }
      term.write(`Error: ${e}\r\n`);
    }
    term.write(prompt);
  }

  while (true) {
    const line = await getLine();
    await handleLine(line);
  }
}

run().catch((e) => {
  statusEl.textContent = "Failed";
  term.write(`Error: ${e}\r\n`);
});