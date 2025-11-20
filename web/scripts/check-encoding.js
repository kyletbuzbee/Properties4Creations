const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.md', '.html'];
let failures = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
      walk(full);
    } else {
      if (exts.includes(path.extname(entry.name))) {
        const buf = fs.readFileSync(full);
        const s = buf.toString('utf8');
        if (s.includes('\uFFFD')) {
          failures.push(full);
        }
      }
    }
  }
}

walk(root);

if (failures.length) {
  console.error('Encoding check failed. Non-UTF8 characters (replacement char) found in:');
  failures.forEach(f => console.error(' -', f));
  process.exitCode = 2;
} else {
  console.log('Encoding check passed — no replacement characters found.');
}
