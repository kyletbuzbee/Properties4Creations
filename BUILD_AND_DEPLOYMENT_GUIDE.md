# Build & Deployment Guide

## Project Structure

Properties 4 Creation is a monorepo with the following structure:

```
Properties4Creations/
├── web/                    # Next.js web application
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── scripts/
├── functions/              # Firebase Cloud Functions
│   ├── package.json
│   └── src/
├── P4C/                    # Static HTML site
│   ├── *.html
│   ├── static-*.js
│   └── index.html
├── package.json            # Root workspace config
└── .github/workflows/      # GitHub Actions
    └── deploy.yml
```

---

## Development Setup

### Prerequisites
- **Node.js**: v20.x or higher (v20.19.5+ recommended)
- **npm**: v9.0.0 or higher (v10.8.2+ recommended)
- **Git**: For version control

### Initial Setup

```bash
# Clone repository
git clone https://github.com/kyletbuzbee/Properties4Creations.git
cd Properties4Creations

# Install all dependencies
npm install

# Or use the setup script
npm run setup
```

### Environment Variables

**Web App (.env.local)**
```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-id
# No Mapbox key needed - using OpenFreeMap!
```

**Functions (.env)**
```bash
# Firebase configuration (handled by firebase.json)
```

---

## Local Development

### Start Web Development Server
```bash
# From root directory
npm run dev

# Or directly in web folder
cd web
npm run dev
```

Server runs at `http://localhost:3000`

### Build for Production

```bash
# Build web application
npm run build

# Build functions
npm --workspace=functions run build
```

### Static Export

Generate static HTML export for GitHub Pages:

```bash
npm run export

# Output: web/out/
```

---

## GitHub Actions Workflow

### Deployment Pipeline

The `.github/workflows/deploy.yml` file automates deployment:

```yaml
1. Checkout code
2. Setup Node.js (v20)
3. Install root dependencies
4. Install web dependencies
5. Build web application (next build)
6. Export static files (next export)
7. Copy artifacts to docs/
8. Deploy to GitHub Pages
```

### Build Output Structure

After successful build:

```
web/
├── .next/              # Build artifacts
├── out/                # Static export
└── public/
```

Copy to `docs/`:
```
docs/
├── index.html
├── projects/
├── resources/
├── about/
├── contact/
├── static-*.js         # P4C interactive libs
└── p4c-export.js
```

---

## Troubleshooting Build Errors

### Error: Missing script: "build"

**Cause**: Running `npm run build` from root without proper workspace setup

**Solution**:
```bash
# Ensure you're in the web directory
cd web
npm run build

# Or use workspace from root
npm --workspace=web run build
```

### Error: EBADENGINE - Unsupported engine

**Cause**: Node version mismatch

**Solution**:
```bash
# Check Node version
node --version

# Use Node 20+
nvm use 20
# or
nvm install 20
```

### Error: npm ci fails with deprecation warnings

**Cause**: Old or unsupported packages in dependencies

**Solution**:
```bash
# These are warnings only - build still proceeds
# To audit vulnerabilities
npm audit

# To fix auto-fixable vulnerabilities
npm audit fix

# To see what can be fixed
npm audit fix --dry-run
```

**Common deprecated packages** (warnings only):
- `amqplib@0.5.2` - requires Node <=9 (we use v20, so ignored)
- `tailwind@4.0.0` - deprecated package name (use `tailwindcss` instead)
- Various uuid packages - upgrade recommended but not critical

### Error: Export static files not found

**Cause**: `npm run export:static` failed silently

**Solution**:
```bash
# Check if out/ directory exists
ls -la web/out/

# Run export directly
cd web
npm run export:static

# Check for errors in scripts/static-export.js
cat scripts/static-export.js
```

### Error: Copy static files fails

**Cause**: Source files don't exist where workflow expects them

**Solution**:
```bash
# Verify P4C files exist
ls -la P4C/*.js

# Verify export succeeded
ls -la web/out/

# Run copy command manually
mkdir -p docs
cp -r web/out/* docs/
cp P4C/*.js docs/
```

---

## Dependencies & Vulnerabilities

### Critical Dependencies

#### Web Application
- **next**: ^14.2.33 - React framework
- **react**: ^18 - UI library
- **react-dom**: ^18 - React DOM rendering
- **tailwindcss**: ^3.3.0 - Styling
- **firebase**: ^12.6.0 - Backend services
- **leaflet**: ^1.9.4 - Maps (replaces Mapbox!)

#### Functions
- **firebase-admin**: ^12.6.0 - Firebase admin SDK
- **firebase-functions**: ^6.0.1 - Cloud functions
- **typescript**: ^5.7.3 - Type safety
- **axios**: ^1.6.0 - HTTP client
- **googleapis**: ^118.0.0 - Google APIs

### Known Issues

#### EBADENGINE warnings
These are safe to ignore:
```
npm warn EBADENGINE package: 'amqplib@0.5.2', required: node: '>=0.8 <=9'
```

**Why**: We're using Node 20, but amqplib is bundled by another package and not used directly. It's not a blocker.

#### Deprecated packages
These show warnings but don't break builds:
- `tailwind@4.0.0` - Use `tailwindcss` instead (already in use)
- `uuidv4@3.0.1` - Use native `crypto.randomUUID()` instead
- Various others - Audit shows 22 total vulnerabilities

#### Vulnerability Summary (npm audit)
```
6 low
5 moderate
10 high
1 critical
```

**Status**: Most are in transitive dependencies and don't affect runtime. Recommended: `npm audit fix --dry-run` to see fixable issues.

---

## Performance Optimization

### Build Optimization Flags

```bash
# Analyze bundle size
npm run bundle-analyze

# Standard build
npm run build

# With optimizations
NEXT_PUBLIC_ANALYTICS_ID=xxx npm run build

# Export for static hosting
npm run export
```

### Static Export Benefits
- ✅ No server required
- ✅ Instant page loads
- ✅ Free hosting (GitHub Pages)
- ✅ Maps work (OpenFreeMap - $0/year!)
- ✅ Forms work (Firestore backend)

---

## Deployment to Different Platforms

### GitHub Pages (Current)
```bash
# Automatic on push to main
git push origin main

# Deploys: docs/ directory
# URL: https://kyletbuzbee.github.io/Properties4Creations/
```

### Vercel (Alternative)
```bash
# Connect repo to Vercel
# Auto-deploys on push
# No static export needed
```

### Firebase Hosting (Alternative)
```bash
firebase deploy

# Deploys both web app and functions
```

### Docker (For Production)
```bash
# Build Docker image
docker build -t p4c .

# Run container
docker run -p 3000:3000 p4c
```

---

## Database & Backend

### Firestore Setup
```bash
# Initialize Firebase
firebase init

# Deploy rules
firebase deploy --only firestore:rules

# Access emulator locally
firebase emulators:start
```

### Environment Configuration
```bash
# .env files handled by Firebase config
# No secrets in repo - use GitHub Secrets

# In GitHub Actions, secrets are automatically available
echo ${{ secrets.FIREBASE_CONFIG }}
```

---

## Continuous Integration

### GitHub Actions Features

**On each push to main:**
- ✅ Checkout latest code
- ✅ Install dependencies (npm ci)
- ✅ Build application (next build)
- ✅ Run tests (if added)
- ✅ Export static files
- ✅ Deploy to GitHub Pages

**On pull requests:**
- ✅ Run build (verify not breaking)
- ✅ Run linting (code quality)
- ✅ Run tests (if added)

### Manual Deployment

If workflow fails, deploy manually:

```bash
# Build locally
cd web
npm install
npm run build
npm run export:static

# Commit changes
cd ..
git add docs/
git commit -m "Manual deployment"
git push origin main
```

---

## Maintenance

### Regular Tasks

#### Monthly
```bash
# Check for updates
npm outdated

# Run audit
npm audit
```

#### Quarterly
```bash
# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix

# Run full test suite
npm test
```

#### Before Major Release
```bash
# Full dependency update
npm update --save

# Rebuild everything
npm run build

# Export and test static site
npm run export

# Manual testing of critical flows
```

---

## Quick Reference Commands

```bash
# Setup
npm install                    # Install all dependencies
npm run setup                  # Complete setup

# Development
npm run dev                    # Start dev server (web)
npm run build                  # Build for production
npm run start                  # Start production server

# Exports & Deployment
npm run export                 # Generate static export
npm run lint                   # Run linters
npm run test                   # Run tests

# Workspace commands
npm --workspace=web run build  # Build web only
npm --workspace=functions run build  # Build functions only

# Utilities
npm audit                      # Check vulnerabilities
npm fund                       # View funding opportunities
npm outdated                   # See what can be updated
```

---

## Troubleshooting Checklist

Before asking for help, verify:
- [ ] Node version is 20+: `node --version`
- [ ] npm version is 9+: `npm --version`
- [ ] All dependencies installed: `npm ci`
- [ ] Build succeeds locally: `npm run build`
- [ ] Export succeeds: `npm run export`
- [ ] Git is clean: `git status`
- [ ] Latest main branch: `git pull origin main`

---

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **OpenFreeMap**: https://openfreemap.org
- **Leaflet Docs**: https://leafletjs.com

---

## Getting Help

**Build Issues:**
1. Check error message carefully
2. Verify Node/npm versions
3. Try `npm ci` to clean install
4. Check `.github/workflows/deploy.yml` for correct steps

**Deployment Issues:**
1. Verify build succeeds locally
2. Check `docs/` directory exists and has files
3. Enable GitHub Pages in repository settings
4. Check repository is public (for GitHub Pages)

**Code Issues:**
1. Run linter: `npm run lint`
2. Fix auto-fixable issues: `npm run lint -- --fix`
3. Run tests: `npm run test`
4. Check TypeScript: `npx tsc --noEmit`

---

**Last Updated:** November 20, 2025  
**Status:** ✅ Production Ready  
**Node Version:** 20.19.5+  
**npm Version:** 10.8.2+
