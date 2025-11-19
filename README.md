# Properties 4 Creations Website

## Project Purpose
This project builds a comprehensive website for Properties 4 Creation, a nonprofit organization dedicated to helping veterans with home renovations and improvements. The website serves as a platform to showcase projects, collect leads for seller evaluations and veteran/Section 8 buyer matching, provide resources, and facilitate contractor partner onboarding.

## Stack Summary
- **Frontend**: Next.js (React) with SSR for SEO, ISR for project pages, Elementor-like page builder components
- **Hosting**: Firebase Hosting with CDN, rewrites to Cloud Run for dynamic SSR if needed
- **Data Store / CMS**: Firestore collections for Projects, TeamMembers, Testimonials, Resources, Leads
- **Functions / APIs**: Firebase Cloud Functions (Node.js/TypeScript) for transactional email sends and data sync
- **Auth / Portal**: Firebase Authentication with email link sign-in for contractor portal access
- **Media Management**: Cloud Storage (GCS) with signed URLs, optional Cloudinary integration
- **Email**: SendGrid for transactional emails (auto-replies, notifications)
- **Operational Data**: Google Sheets sync for lead management workflows
- **Analytics**: Google Analytics 4 + Google Tag Manager for event tracking
- **Scheduling**: Calendly links in email responses
- **CI/CD**: GitHub Actions for build, test, Lighthouse CI, and Firebase deploy
- **Monitoring**: Google Cloud Monitoring + Error Reporting, budget alerts
- **Security**: Firebase Security Rules, reCAPTCHA for forms, rate limiting in functions

## Required Environment Variables
Store securely in GitHub Secrets and Cloud Secret Manager:

- `FIREBASE_SERVICE_ACCOUNT_JSON`: Service account key JSON for deployments
- `GCP_PROJECT_ID_STAGING`: Properties-4-creation-staging project ID
- `GCP_PROJECT_ID_PROD`: Properties-4-creation-prod project ID
- `SENDGRID_API_KEY`: API key for SendGrid email sending
- `SHEETS_SERVICE_ACCOUNT_JSON`: Service account key for Google Sheets access
- `RECAPTCHA_SITE_KEY`: reCAPTCHA public site key
- `RECAPTCHA_SECRET_KEY`: reCAPTCHA secret key for server verification
- `SENTRY_DSN`: Sentry error tracking endpoint (optional)

## Folder Layout
- `design/`: Design assets and wireframes
- `docs/`: Documentation, content inventory, and editorial guides
- `infra/`: Infrastructure scripts for GCP/Firebase setup and service accounts
- `web/`: Next.js frontend application (App Router)
  - `public/`: Static assets, robots.txt, sitemap.xml
  - `src/`: Application source
    - `app/`: Next.js app router routes and API routes
    - `components/`: Reusable React components (Header, Hero, ProjectCard, etc.)
    - `styles/`: CSS stylesheets and utility classes
    - `utils/`: Shared functions and helpers
  - `functions/`: Firebase Cloud Functions source (Node.js/TypeScript)
- `scripts/`: Seed scripts, migration tools, and utilities
- `tests/`: Test suites, Firebase emulator tests

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
