# Firestore Data Model Schema

## Overview
This document defines the Firestore collections and document structures for the Properties 4 Creation Firebase application. Firestore uses document-based storage with hierarchical collections and subcollections where needed. All data access is performed using the Firebase Admin SDK or client SDK with security rules enforcement.

## Collections and Document Structures

### projects (Collection)
**Purpose**: Stores renovation project details with media, timelines, andVeteran metadata.

**Document Structure**:
```javascript
{
  id: string,  // Auto-generated document ID
  title: string, // Project title (required)
  slug: string, // URL slug for routing (required)
  status: string, // "Planning" | "Started" | "In Progress" | "Completed" | "Cancelled"
  city: string, // e.g., "Austin, TX" (required)
  neighborhood: string, // Additional location detail (optional)
  featured_image_url: string, // GCS URL for display image (optional)
  before_images: string[], // Array of GCS URLs for before photos
  after_images: string[], // Array of GCS URLs for after photos
  description: string, // Rich text project description (required)
  timeline: Array<{date: string, milestone: string}>, // Chronological project steps
  budget_range: string, // e.g., "$50k-$100k" (required)
  permits: Array<{permit_type: string, status: string, cost: number}>, // Permit tracking
  lessons_learned: string, // Post-completion insights (wysiwyg)
  veteran_focus: boolean, // True for veteran-targeted projects (required)
  tags: string[], // Array of tag strings for filtering (e.g., ["Veteran", "Bathroom", "Electrical"])
  created_at: timestamp, // Auto-generated
  updated_at: timestamp, // Auto-updated on edits
}
```

**Security**: Public read access via Firestore rules. Writes handled by admin functions only.

### teamMembers (Collection)
**Purpose**: Professional profiles for team members including bios and social links.

**Document Structure**:
```javascript
{
  id: string, // Auto-generated
  name: string, // Full name (required)
  role: string, // Job title (required)
  bio: string, // Rich text biography (required)
  headshot_url: string, // GCS URL for photo (required)
  social_links: Array<{platform: string, url: string}>, // Social media links
  created_at: timestamp, // Auto-generated
  updated_at: timestamp, // Auto-updated
}
```

**Security**: Public read. Admin writes only.

### testimonials (Collection)
**Purpose**: Customer testimonials with related project links for credibility.

**Document Structure**:
```javascript
{
  id: string, // Auto-generated
  author: string, // Full name of testimonial giver (required)
  role: string, // e.g., "Veteran" or "Homeowner" (required)
  content: string, // Quote text (required)
  photo_url: string, // GCS URL for headshot (optional)
  project_id: string, // Reference to projects collection document ID (optional)
  created_at: timestamp, // Auto-generated
  updated_at: timestamp, // Auto-updated
}
```

**Security**: Public read. Admin writes only.

### resources (Collection)
**Purpose**: Downloadable content like guides and reports.

**Document Structure**:
```javascript
{
  id: string, // Auto-generated
  title: string, // Resource title (required)
  body: string, // Description content (wysiwyg, optional)
  category: string, // "Guides" | "Marketing Materials" | "Legal Docs" | "News" (required)
  attachments: Array<{filename: string, url: string, file_size: number}>, // GCS download links
  tags: string[], // Additional filtering tags
  created_at: timestamp, // Auto-generated
  updated_at: timestamp, // Auto-updated
}
```

**Security**: Public read. Admin writes only.

### leads (Collection)
**Purpose**: Form submissions for lead management, including CRM sync statuses.

**Document Structure**:
```javascript
{
  id: string, // Auto-generated
  name: string, // Full name (required)
  email: string, // Email address (required)
  phone: string, // Phone number (optional)
  type: string, // "Seller" | "Veteran" | "Donor" | "Partner" (required)
  city: string, // Location (required)
  message: string, // Freeform message (optional)
  utm_source: string, // Marketing attribution (optional)
  utm_medium: string, // Marketing channel (optional)
  utm_campaign: string, // Campaign name (optional)
  status: string, // "pending" | "processing" | "synced" | "error" (auto-managed)
  crm_id: string, // HubSpot contact ID after sync
  crm_status: string, // "created" | "updated" | "error"
  created_at: timestamp, // Auto-generated
  updated_at: timestamp, // Auto-updated
}
```

**Security**: Create public for form submissions. Read/update restricted to authenticated admin/contractor roles.

## Indexes and Queries
Firestore auto-indexes fields used in queries. Custom indexes may be needed for:
- projects by city, veteran_focus, status
- testimonials by project_id
- leads by type, status, created_at (for admin views)
- resources by category

Define indexes in `firestore.indexes.json` for complex queries.

## Data Validation
- **Client-side**: Form validation in Next.js with error messages
- **Server-side**: Validation in Cloud Functions during create/update operations
- **Firestore rules**: Basic access control (no writes from client apps)

## Implementation in Next.js
Use Firebase client SDK for reads:

```javascript
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';

const getProjects = async () => {
  const q = query(collection(db, 'projects'), where('veteran_focus', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

For SSR/ISR, fetch data in getServerSideProps or getStaticProps.

## Sample Seed Data (JSON format for Firestore imports)

### projects
```json
[
  {
    "title": "123 Oak Street Renovation",
    "slug": "oak-street-renovation",
    "status": "Completed",
    "city": "Austin, TX",
    "neighborhood": "Downtown",
    "description": "Complete kitchen and bathroom renovation for a veteran family.",
    "budget_range": "$45k-$60k",
    "veteran_focus": true,
    "tags": ["Veteran", "Kitchen", "Bathroom"],
    "timeline": [
      {"date": "2024-01-15T00:00:00Z", "milestone": "Initial Assessment"},
      {"date": "2024-05-01T00:00:00Z", "milestone": "Construction Start"},
      {"date": "2024-08-20T00:00:00Z", "milestone": "Completion"}
    ],
    "permits": [
      {"permit_type": "Electrical", "status": "Approved", "cost": 500}
    ],
    "lessons_learned": "Bathroom renovations provide highest ROI"
  },
  {
    "title": "Urban Loft Modernization",
    "slug": "urban-loft-modernization",
    "status": "In Progress",
    "city": "Dallas, TX",
    "description": "Converting a downtown loft into modern living space.",
    "budget_range": "$75k-$90k",
    "veteran_focus": false,
    "tags": ["Loft", "Electrical", "HVAC"]
  },
  {
    "title": "Family Home Renovation",
    "slug": "family-home-renovation",
    "status": "Planned",
    "city": "Houston, TX",
    "description": "Full home modernization for a growing veteran family.",
    "budget_range": "$55k-$70k",
    "veteran_focus": true,
    "tags": ["Veteran", "Family Home", "Kitchen"]
  }
]
```

### teamMembers
```json
[
  {
    "name": "Kyle Turner",
    "role": "Founder & CEO",
    "bio": "Veteran Navy member turned entrepreneur...",
    "social_links": [
      {"platform": "LinkedIn", "url": "https://linkedin.com/in/kyle-turner"}
    ]
  },
  {
    "name": "Sarah Johnson",
    "role": "Project Manager",
    "bio": "Construction management expert with 10 years experience..."
  },
  {
    "name": "Mike Rodriguez",
    "role": "Lead Contractor",
    "bio": "Licensed contractor specializing in veteran housing..."
  }
]
```

### testimonials
```json
[
  {
    "author": "John Smith",
    "role": "Veteran Soldier",
    "content": "Kyle's team transformed our home into a dream. As a veteran, it means the world!",
    "project_id": "oak-street-renovation"
  },
  {
    "author": "Jane Doe",
    "role": "Homeowner",
    "content": "Amazing renovations - the loft looks straight out of a magazine!",
    "project_id": "urban-loft-modernization"
  },
  {
    "author": "Bob Williams",
    "role": "Veteran",
    "content": "P4C changes lives with their veteran-focused programs.",
    "project_id": "family-home-renovation"
  }
]
```

### resources
```json
[
  {
    "title": "Complete Home Evaluation Guide",
    "body": "Learn what to expect from professional evaluations...",
    "category": "Guides",
    "attachments": [
      {"filename": "home-evaluation-guide.pdf", "url": "gs://properties4creations.appspot.com/resources/guide.pdf", "file_size": 2048576}
    ]
  },
  {
    "title": "Veteran Housing Needs Survey",
    "body": "Help us serve veterans better...",
    "category": "Marketing Materials",
    "tags": ["Survey", "Veterans"]
  }
]
```

## Migration and Import Scripts
- **Seed Script**: `scripts/seedFirestore.js` uses Firebase Admin SDK to import JSON data
- **CSV Import**: `scripts/importCSV.js` parses and converts CSV to Firestore docs
- **Production Sync**: Use Firebase CLI or gcloud commands for bulk imports

## Acceptance Criteria for Schema
- [ ] All collections match documented structure
- [ ] Sample data imported successfully into emulator and staging
- [ ] Queries in Next.js return expected data shapes
- [ ] Security rules allow public reads, restrict writes appropriately
- [ ] Indexes created for efficient queries
