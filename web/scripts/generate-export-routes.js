#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Paths
const repoRoot = path.resolve(__dirname, '..', '..');
const seedFile = path.join(repoRoot, 'scripts', 'seedFirestore.js');
const routesFile = path.join(__dirname, 'export-routes.json');

function extractSlugsFromSeed(content) {
  // Very small parser: find slug: "..." within the projectsSeed array
  const projectBlockMatch = content.match(/const\s+projectsSeed\s*=\s*\[([\s\S]*?)\];/m);
  if (!projectBlockMatch) return [];
  const block = projectBlockMatch[1];
  const slugRegex = /slug\s*:\s*"([^"]+)"/g;
  const slugs = new Set();
  let m;
  while ((m = slugRegex.exec(block)) !== null) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

function readRoutes() {
  try {
    const raw = fs.readFileSync(routesFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return ['/'];
  }
}

function writeRoutes(routes) {
  fs.writeFileSync(routesFile, JSON.stringify(routes, null, 2) + '\n', 'utf8');
  console.log('Wrote', routesFile);
}

function main() {
  if (!fs.existsSync(seedFile)) {
    console.error('Seed file not found at', seedFile);
    process.exit(1);
  }

  const seed = fs.readFileSync(seedFile, 'utf8');
  const slugs = extractSlugsFromSeed(seed);
  if (!slugs.length) {
    console.log('No slugs found in seed file.');
  } else {
    console.log('Found slugs:', slugs.join(', '));
  }

  const routes = readRoutes();

  // Add /projects/<slug> for each slug, preserving order and uniqueness
  const normalized = Array.from(new Set(routes));
  for (const slug of slugs) {
    const route = `/projects/${slug}`;
    if (!normalized.includes(route)) normalized.push(route);
  }

  writeRoutes(normalized);
}

if (require.main === module) main();
