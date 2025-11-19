# GCP and Firebase Infrastructure Setup Manual

## GCP Project Creation and API Enablement
### Projects Setup:
1. Access Google Cloud Console at console.cloud.google.com
2. Create/select billing account and organization
3. Create two GCP projects:
   - `properties-4-creation-staging` for development/testing
   - `properties-4-creation-prod` for production deployment
4. Enable required APIs for each project:
   - Firebase Management API
   - Cloud Functions API
   - Cloud Firestore API (in native mode)
   - Cloud Storage API
   - Cloud Run API (if using full SSR)
   - Secret Manager API
   - Cloud Monitoring API
   - Error Reporting API
   - Cloud Build API (for CI/CD)

### Firebase Projects Initialization:
1. Navigate to Firebase Console at console.firebase.google.com
2. Add Firebase to each GCP project created above
3. Enable products per project:
   - Hosting
   - Firestore (choose native mode)
   - Storage
   - Functions
   - Authentication (enable Email Link provider)
4. Note project IDs for use in Firebase CLI and configs

## Service Accounts and Security
### Service Account Creation:
1. In GCP IAM & Admin -> Service Accounts
2. Create service account with minimal required roles:
   - Firebase Admin SDK Administrator Service Agent
   - Cloud Functions Admin
   - Cloud Storage Admin
   - Secret Manager Secret Accessor
3. Generate service account keys (JSON) for deployment
4. Store keys in GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT_JSON`

### Environment Variables Setup:
Store sensitive configuration in Google Cloud Secret Manager:
- `STRIPE_SECRET_KEY`: Stripe secret key for webhook processing
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook endpoint signing secret
- `HUBSPOT_API_KEY`: HubSpot API key for CRM integration
- `GA_MEASUREMENT_ID`: Google Analytics measurement ID
- `GTM_CONTAINER_ID`: Google Tag Manager container ID
- `CALENDLY_URL`: Calendly scheduling link URL

Access in Cloud Functions via Secret Manager client:

```javascript
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();
const [version] = await client.accessSecretVersion({
  name: `projects/${process.env.GCP_PROJECT_ID}/secrets/STRIPE_SECRET_KEY/versions/latest`
});
```

## Firestore Security Rules
Create `firestore.rules` in project root:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for content collections
    match /projects/{projectId} {
      allow read: if true;
      allow write: if false;  // Admin-only writes via Cloud Functions
    }
    match /teamMembers/{teamId} {
      allow read: if true;
      allow write: if false;
    }
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow write: if false;
    }
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if false;
    }

    // Leads: Create public, read/update admin-or-contractors
    match /leads/{leadId} {
      allow create: if true;  // Unauthenticated users can submit lead forms
      allow read, update: if request.auth != null &&
                          (request.auth.token.email in ['admin@properties4creations.com', 'Kyle@properties4creations.com'] ||
                           request.auth.token.role == 'contractor' ||
                           request.auth.token.role == 'editor');
      allow write: if false;  // No direct deletes, managed by functions
    }
  }
}
```

Deploy rules: `firebase deploy --only firestore:rules`

## Cloud Storage Security Rules
Create `storage.rules` in project root:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read for uploaded media
    match /{projectImages=projects/**} {
      allow read: if true;
      allow write: if false;  // Only via signed URLs from functions
    }
    match /{teamHeadshots=team/**} {
      allow read: if true;
      allow write: if false;
    }
    match /{testimonialPhotos=testimonials/**} {
      allow read: if true;
      allow write: if false;
    }

    // Document uploads for resources
    match /{documents=resources/**} {
      allow read: if true;
      allow write: if false;
    }

    // Contractor uploads (authenticated)
    match /{contractorUploads=contractor/**} {
      allow read, write: if request.auth != null &&
                          request.auth.token.role in ['admin', 'contractor'];
    }
  }
}
```

Deploy rules: `firebase deploy --only storage`

## Monitoring and Alerting Configuration
### Cloud Monitoring Setup:
1. In GCP Monitoring -> Dashboards -> Create dashboard
2. Add widgets for:
   - Cloud Functions execution count, errors, latency
   - Firestore active connections, read/write operations
   - Cloud Storage total bytes stored
   - Hosting requests and latency
3. Create alerting policies:
   - Function execution errors > 0 in 5 minutes
   - Hosting 5xx errors > 10% of requests in 1 minute
   - Firestore quota usage > 80%

### Error Reporting:
- Automatically enabled with Cloud Functions
- View in Error Reporting tab for stack traces and error patterns

### Budget Alerts:
1. In GCP Billing -> Budgets -> Create budget for each project
2. Set monthly limit (e.g., $50 for staging, $200 for prod)
3. Email alerts at 50%, 75%, 90%, 100% spend

### Uptime Monitoring:
- Use Pingdom or UptimeRobot external service
- Monitor `https://properties4creations.com` every 5 minutes
- Alert on any downtime

## Development Environment Setup
### Firebase CLI Installation:
```
npm install -g firebase-tools
firebase login
```

### Project Initialization:
```
firebase use --add
? Which project? properties-4-creation-staging
? What alias do you want? staging

firebase use staging
firebase init hosting firestore functions storage
```

### Local Emulators:
Run emulators for local development:
```
firebase emulators:start --import=./firestore-data --export-on-exit=./firestore-data
```

This starts Firestore, Functions, Hosting, and Storage emulators with data persistence.

## Production Deployment Security
- Deploy functions to production only after staging tests pass
- Use immutable builds with specific function versions
- Rotate service account keys regularly
- Enable VPC Security Controls for sensitive data access

## Acceptance Criteria Check
- [ ] GCP projects created with correct APIs enabled
- [ ] Firebase projects initialized with required products
- [ ] Service accounts created with minimal scopes
- [ ] Firestore and Storage rules deployed successfully
- [ ] Monitoring dashboards and alerts configured
- [ ] Local emulator environment functional: `firebase emulators:start` runs without errors
- [ ] Seed data loaded into emulator for testing
