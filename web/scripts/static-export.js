#!/usr/bin/env node
/**
 * static-export.js
 * Build the Next app, start it on a temporary port, crawl listed routes with Puppeteer,
 * write rendered HTML files to `web/out/<route>/index.html`, copy `public/` and
 * `.next/static` -> `out/_next/static`, then shut the server down.
 *
 * Usage: from `web/` run `node scripts/static-export.js` or `npm run export:static`.
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const ROUTES_FILE = path.join(__dirname, 'export-routes.json');
const CWD = path.join(__dirname, '..');
const OUT_DIR = path.join(CWD, 'out');
const NEXT_DIR = path.join(CWD, '.next');
const PUBLIC_DIR = path.join(CWD, 'public');
const PORT = parseInt(process.env.EXPORT_PORT || '4000', 10);

async function fileExists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch (e) {
    return false;
  }
}

function routeToOutPath(route) {
  // normalize route and map to out/<route>/index.html
  if (route === '/') return path.join(OUT_DIR, 'index.html');
  // remove leading slash
  const clean = route.replace(/^\//, '').replace(/\?/, '_').replace(/[<>:"\\|?*]/g, '_');
  return path.join(OUT_DIR, clean, 'index.html');
}

async function waitForServerReady(url, timeoutMs = 120000) {
  const start = Date.now();
  const poll = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        if (text && text.indexOf('__NEXT_DATA__') !== -1) return true;
      }
    } catch (e) {
      // ignore
    }
    if (Date.now() - start > timeoutMs) throw new Error('Server readiness timeout');
    await new Promise((r) => setTimeout(r, 1000));
    return poll();
  };
  return poll();
}

async function copyIfExists(src, dest) {
  if (!(await fileExists(src))) return false;
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  // Node 16+ has fs.cp
  if (fs.cp) {
    await fs.promises.rm(dest, { recursive: true, force: true }).catch(() => {});
    await fs.promises.cp(src, dest, { recursive: true });
  } else {
    // fallback: naive recursive copy
    const copyRecursive = async (s, d) => {
      const stat = await fsp.stat(s);
      if (stat.isDirectory()) {
        await fsp.mkdir(d, { recursive: true });
        const files = await fsp.readdir(s);
        for (const f of files) await copyRecursive(path.join(s, f), path.join(d, f));
      } else {
        await fsp.mkdir(path.dirname(d), { recursive: true });
        await fsp.copyFile(s, d);
      }
    };
    await copyRecursive(src, dest);
  }
  return true;
}

async function run() {
  console.log('Starting static export — building app...');
  // 1. Build
  execSync('npm run build', { cwd: CWD, stdio: 'inherit' });

  // 2. Start production server
  console.log(`Starting production server on port ${PORT}...`);
  const server = spawn('npm', ['run', 'start', '--', '-p', String(PORT)], { cwd: CWD, stdio: 'inherit', shell: true });

  // Ensure server shutdown on exit
  const cleanup = () => {
    try {
      server.kill('SIGTERM');
    } catch (e) {}
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  const baseUrl = `http://localhost:${PORT}`;
  console.log('Waiting for server to become ready...');
  try {
    await waitForServerReady(baseUrl);
  } catch (err) {
    console.error('Server failed to become ready:', err);
    cleanup();
    process.exit(1);
  }

  console.log('Server ready. Launching headless browser...');
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
  await page.setViewport({ width: 1280, height: 800 });

  // Read routes
  let routes = ['/'];
  try {
    const raw = await fsp.readFile(ROUTES_FILE, 'utf8');
    routes = JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read export-routes.json — using ["/"]');
  }

  // Clear out dir
  await fsp.rm(OUT_DIR, { recursive: true, force: true }).catch(() => {});
  await fsp.mkdir(OUT_DIR, { recursive: true });

  for (const route of routes) {
    try {
      const url = baseUrl + route;
      console.log(`Crawling ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      // Wait a short time for animations to settle (helps SSR pages with client enhancements)
      await page.waitForTimeout(300);

      const html = await page.content();

      const outPath = routeToOutPath(route);
      await fsp.mkdir(path.dirname(outPath), { recursive: true });
      // If enhancement flag is set, inject enhancement CSS/JS references into the saved HTML
      const enhance = process.env.ENHANCE_STATIC === 'true';
      let finalHtml = html;
      if (enhance) {
        // inject Google Fonts and enhancement CSS into <head>
        const headInsert = `\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">\n    <link rel=\"stylesheet\" href=\"/static-enhance.css\">\n`;
        finalHtml = finalHtml.replace(/<head([^>]*)>/i, (m) => m + headInsert);

        // inject enhancement script before closing body
        const scriptInsert = `\n    <script src=\"/static-enhance.js\" defer></script>\n`;
        if (finalHtml.indexOf('</body>') !== -1) {
          finalHtml = finalHtml.replace('</body>', scriptInsert + '</body>');
        } else {
          finalHtml = finalHtml + scriptInsert;
        }
      }

      await fsp.writeFile(outPath, finalHtml, 'utf8');
      console.log(`Wrote ${outPath}` + (enhance ? ' (enhanced)' : ''));
    } catch (e) {
      console.error(`Failed to crawl route ${route}:`, e.message || e);
    }
  }

  // Copy public/ files into out/ (preserve root paths)
  console.log('Copying public/ assets...');
  if (await fileExists(PUBLIC_DIR)) {
    // Copy contents of public into OUT_DIR (not into out/public)
    const entries = await fsp.readdir(PUBLIC_DIR);
    for (const entry of entries) {
      const src = path.join(PUBLIC_DIR, entry);
      const dest = path.join(OUT_DIR, entry);
      await copyIfExists(src, dest).catch((e) => console.error('Copy public entry failed:', e));
    }
  }

  // Copy .next/static -> out/_next/static
  console.log('Copying .next/static -> out/_next/static ...');
  const nextStaticSrc = path.join(NEXT_DIR, 'static');
  const nextStaticDest = path.join(OUT_DIR, '_next', 'static');
  await copyIfExists(nextStaticSrc, nextStaticDest).catch((e) => console.error('Copy _next/static failed:', e));

  await browser.close();

  console.log('Shutting down the server...');
  cleanup();

  console.log('Static export complete. Output in:', OUT_DIR);
}

run().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
