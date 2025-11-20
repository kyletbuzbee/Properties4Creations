Static Export Utility
=====================

What this does
--------------

This script generates a fully static copy of the Next.js site located under `web/`.
It:

- Runs `npm run build` to create the production build.
- Starts the production server (`next start`) on a temporary port (default `4000`).
- Uses Puppeteer to visit each route listed in `scripts/export-routes.json` and writes
  the rendered HTML to `out/<route>/index.html`.
- Copies files from `public/` into `out/` and copies `.next/static` into `out/_next/static`.

How to use
----------

1. From the `web/` directory, install dependencies if needed:

```powershell
cd "d:\Properties 4 Creation\web"
npm install
```

2. Run the export:

```powershell
npm run export:static
```

3. Result: `web/out/` will contain the exported site (HTML files + assets).

Notes & Recommendations
-----------------------

- Edit `scripts/export-routes.json` to include all routes you want exported. For dynamic
  routes (e.g. `/projects/[slug]`) provide a list of slugs such as `/projects/project-1`.
- Interactive client-only features (Firebase realtime, authentication, form submissions)
  will not function as serverless static HTML — you can add client-side JS to hydrate
  or show a fallback message in the exported site.
- If your app requires environment variables at runtime (e.g., public API keys), make sure
  they are provided in your environment before running the exporter (e.g., set NEXT_PUBLIC_* variables).
- For CI usage, run `npm ci` then `npm run export:static` on a machine with Chrome available.

Troubleshooting
---------------

- If the server fails to start, check console output for port conflicts or build errors.
- If pages are missing images, confirm images exist in `public/` and that `.next/static` copied successfully.
