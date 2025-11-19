# Properties 4 Creation Website

## Project Purpose
This project builds a comprehensive website for Properties 4 Creation, a nonprofit organization dedicated to helping veterans with home renovations and improvements. The website serves as a platform to showcase projects, collect leads for evaluation requests, process donations, provide resources, and facilitate partnerships.

## Stack Summary
- **Frontend**: Next.js (React) with SSR for SEO, ISR for project pages, Elementor-like page builder components
- **Hosting**: Firebase Hosting with CDN, rewrites to Cloud Run for dynamic SSR if needed
- **Data Store / CMS**: Firestore collections for Projects, TeamMembers, Testimonials, Resources, Leads
- **Functions / APIs**: Firebase Cloud Functions (Node.js) for webhook handling, CRM sync, media uploads
- **Auth / Portal**: Firebase Authentication with email link sign-in for contractor portal access
- **Media Management**: Cloud Storage (GCS) with signed URLs, optional Cloudinary integration
- **Payments**: Stripe Checkout with webhook handlers in Cloud Functions
- **CRM**: HubSpot API integration via Cloud Functions for lead sync
- **Analytics**: Google Analytics 4 + Google Tag Manager for event tracking
- **Scheduling**: Calendly links in email responses
- **CI/CD**: GitHub Actions for build, test, Lighthouse CI, and Firebase deploy
- **Monitoring**: Google Cloud Monitoring + Error Reporting, budget alerts
- **Security**: Firebase Security Rules, reCAPTCHA, rate limiting in functions

## Folder Layout
- `design/`: Design assets and wireframes
- `docs/`: Documentation, content inventory, and editorial guides
- `infra/`: Infrastructure scripts for GCP/Firebase setup and service accounts
- `web/`: Next.js frontend application
  - `public/`: Static assets, robots.txt, sitemap.xml
  - `src/`: Application source
    - `components/`: Reusable React components (Header, Hero, ProjectCard, etc.)
    - `pages/`: Next.js pages and API routes
    - `styles/`: CSS stylesheets and utility classes
    - `utils/`: Shared functions and helpers
  - `functions/`: Firebase Cloud Functions source
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
