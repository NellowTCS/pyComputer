import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pycomputerDir = path.join(__dirname, '../pyComputer/pycomputer');
const sdkDir = path.join(__dirname, '../pyComputerSDK/src/pycomputersdk');
const mainPy = path.join(__dirname, '../pyComputer/main.py');
const rootDir = path.join(__dirname, '../root');
const outFile = path.join(__dirname, 'pycomputer_bundled.js');

const IGNORE = ['__pycache__', '.pyc', 'node_modules', '.venv'];

function walk(dir, base = '') {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    if (IGNORE.some(i => entry.includes(i))) continue;
    const full = path.join(dir, entry);
    const rel = path.join(base, entry).replace(/\\/g, '/');
    if (fs.statSync(full).isDirectory()) {
      files.push(...walk(full, rel));
    } else {
      files.push({ full, rel });
    }
  }
  return files;
}

// Walk pycomputer package with 'pycomputer/' prefix
const pyFiles = walk(pycomputerDir, 'pycomputer');
// Walk SDK package with 'pycomputersdk/' prefix
const sdkFiles = walk(sdkDir, 'pycomputersdk');
// Include main.py at app root
pyFiles.push({ full: mainPy, rel: 'main.py' });
// Walk root files (no prefix — placed at /root/)
const rootFiles = walk(rootDir, '');

const fileData = {};
for (const f of [...pyFiles, ...sdkFiles, ...rootFiles]) {
  fileData[f.rel] = fs.readFileSync(f.full, 'utf8');
}

const js = `export const FILES = ${JSON.stringify(fileData, null, 2)};

export function extractFiles(pyodide) {
  const FS = pyodide.FS;
  const dirs = new Set();
  for (const filepath of Object.keys(FILES)) {
    const prefix = filepath.startsWith('pycomputer/') || filepath.startsWith('pycomputersdk/') || filepath === 'main.py' ? '/app' : '/root';
    const target = prefix + '/' + filepath;
    const dir = target.replace(/[^/]*$/, '');
    if (dir) dirs.add(dir);
  }
  for (const dir of dirs) {
    try { FS.createTree(dir); } catch {}
  }
  for (const [filepath, data] of Object.entries(FILES)) {
    const prefix = filepath.startsWith('pycomputer/') || filepath.startsWith('pycomputersdk/') || filepath === 'main.py' ? '/app' : '/root';
    const target = prefix + '/' + filepath;
    try { FS.writeFile(target, data); } catch {}
  }
  return Object.keys(FILES).length;
}
`;

fs.writeFileSync(outFile, js);
console.log(`Wrote ${outFile}`);
console.log(`Bundled ${pyFiles.length} src + ${sdkFiles.length} sdk + ${rootFiles.length} root files`);
