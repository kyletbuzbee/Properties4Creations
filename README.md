# Properties 4 Creations - Veteran Housing Website

## Project Purpose
This project builds a comprehensive website for Properties 4 Creation, a nonprofit organization dedicated to helping veterans with home renovations and improvements. The website serves as a platform to showcase completed projects, collect leads for property evaluations and Section 8 housing matching, provide veteran housing resources, and facilitate community partnerships.

## Technology Stack
- **Frontend**: Next.js 14 (React 18) with App Router, TypeScript
- **Styling**: Tailwind CSS with custom PostCSS configuration
- **Hosting**: Firebase Hosting with CDN
- **Backend**: Firebase Cloud Functions (Node.js/TypeScript)
- **Database**: Firestore for projects, leads, and content
- **Authentication**: Firebase Auth with email link sign-in for contractor portal
- **Forms**: React Hook Form with reCAPTCHA v3 validation
- **Email**: SendGrid for transactional emails
- **Analytics**: Google Analytics 4
- **Development**: ESLint, Prettier, TypeScript

## Quick Start

### Prerequisites
- Node.js 22+
- npm or pnpm
- Firebase CLI installed globally

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   cd web && npm install
   cd ../functions && npm install
   ```
3. Set up environment variables (copy `web/.env.local.example` to `web/.env.local` and fill in real Firebase/reCAPTCHA keys)
4. Start local development:
   ```bash
   cd web && npm run dev
   ```
5. In another terminal, start Firebase emulators:
   ```bash
   firebase emulators:start
   ```

## Folder Structure
- `assets/` - Image and media assets
- `functions/` - Firebase Cloud Functions (Node.js/TypeScript)
- `docs/` - Project documentation and schemas
- `infra/` - Infrastructure setup and configuration
- `public/` - Static assets for Next.js
- `scripts/` - Seed scripts and utilities
- `web/` - Next.js frontend application
  - `src/app/` - App Router pages
  - `src/components/` - Reusable React components
  - `src/lib/` - Firebase configuration and utilities
- `.vscode/settings.json` - VS Code workspace settings

## Environment Variables

### Web App (web/.env.local)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Cloud (GitHub Secrets / Cloud Secret Manager)
- `FIREBASE_SERVICE_ACCOUNT_JSON`: Service account key for deployments
- `SENDGRID_API_KEY`: API key for email sending
- `RECAPTCHA_SECRET_KEY`: reCAPTCHA secret key for server verification

## Development Commands
- `cd web && npm run dev` - Start Next.js dev server
- `cd functions && npm run build` - Build Cloud Functions
- `firebase emulators:start` - Start local Firebase emulators
- `npm run lint` - Run ESLint (functions) or `npm run lint` (web)

## Deployment
- Staging: Merges to integration branch auto-deploy to staging project
- Production: Merges to main branch auto-deploy to production
- Manual deploy: `firebase deploy --only hosting,functions`

## Recent Updates
- Fixed ESLint errors in Cloud Functions
- Added VS Code settings to ignore Tailwind @rules warnings
- Created PostCSS configuration for Tailwind processing
- Implemented lead form with Firebase Functions backend
- Added Section 8 housing program integration

## Contributor Guides
- **Branching**: Git flow with branches (main, integration, staging, production) plus feature branches as needed
- **Commits**: Clear, descriptive messages with conventional format
- **Local Development**: Use Firebase Emulator Suite for local testing (Firestore, Functions, Auth)
- **Code Style**: ESLint, Prettier for JS/TS, lint-staged pre-commit hooks
- **Testing**: Jest for unit/integration, Playwright for E2E, axe-core for accessibility
- **Deployment**: Merges to integration deploy to staging Firebase project, main to production
- **Security**: Never commit secrets; use GitHub Secrets and Cloud Secret Manager

Run `firebase emulators:start` for local dev with hot reload and data persistence.

## Branch Setup Commands
After Git initialization:
```
git checkout -b design
git checkout -b feature/build
git checkout -b integration
git checkout -b staging
git checkout -b production
git checkout main
