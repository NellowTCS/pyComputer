import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../pyComputer');
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

const pyFiles = walk(srcDir, 'src').map(f => ({ ...f, rel: f.rel.replace(/^src\//, '') }));
const rootFiles = walk(rootDir, 'root').map(f => ({ ...f, rel: f.rel.replace(/^root\//, '') }));

const fileData = {};
for (const f of [...pyFiles, ...rootFiles]) {
  fileData[f.rel] = fs.readFileSync(f.full, 'utf8');
}

const js = `export const FILES = ${JSON.stringify(fileData, null, 2)};

export function extractFiles(pyodide) {
  const FS = pyodide.FS;
  
  // Create directories
  const dirs = new Set(['/pyComputer']);
  for (const filepath of Object.keys(FILES)) {
    const dir = '/pyComputer/' + filepath.replace(/[^/]*$/, '');
    if (dir) dirs.add(dir);
  }
  
  for (const dir of dirs) {
    try { FS.createTree(dir); } catch {}
  }
  
  // Write files
  for (const [filepath, data] of Object.entries(FILES)) {
    try { FS.writeFile('/pyComputer/' + filepath, data); } catch {}
  }
  
  return Object.keys(FILES).length;
}
`;

fs.writeFileSync(outFile, js);
console.log(`Wrote ${outFile}`);
console.log(`Bundled ${pyFiles.length} src + ${rootFiles.length} root files`);