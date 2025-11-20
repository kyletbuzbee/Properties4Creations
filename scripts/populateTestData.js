#!/usr/bin/env node

/**
 * Properties 4 Creation - Sample Data Seeding Script
 *
 * Populates test data for development/demonstration purposes.
 *
 * Usage:
 *   For Emulator: set FIRESTORE_EMULATOR_HOST=localhost:8080 && node scripts/populateTestData.js
 *   For Emulator (PowerShell): $env:FIRESTORE_EMULATOR_HOST="localhost:8080"; node scripts/populateTestData.js
 *   For Production: set GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json && node scripts/populateTestData.js
 */

const path = require('path');
const fs = require('fs');

// Try to require firebase-admin from functions directory if not found locally
let admin;
try {
  admin = require('firebase-admin');
} catch (e) {
  try {
    admin = require('../functions/node_modules/firebase-admin');
  } catch (e2) {
    console.error('Error: firebase-admin not found. Please run: npm install firebase-admin --save-dev');
    process.exit(1);
  }
}

// Initialize Firebase Admin
let projectId = null;

// Try to get project ID from firebase.json
try {
  const firebaseConfig = require(path.join(__dirname, '..', 'firebase.json'));
  if (firebaseConfig.projectId) {
    projectId = firebaseConfig.projectId;
  }
} catch (e) {
  // firebase.json not found or doesn't have projectId
}

if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log('Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
  const config = {
    projectId: process.env.FIREBASE_PROJECT_ID || projectId || 'demo-project'
  };
  admin.initializeApp(config);
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const serviceAccount = require(path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.error('Must set either:');
  console.error('  - FIRESTORE_EMULATOR_HOST for local development');
  console.error('  - GOOGLE_APPLICATION_CREDENTIALS for production');
  process.exit(1);
}

const db = admin.firestore();

const sampleProjects = [
  {
    slug: 'downtown-austin-vet-home',
    title: 'Downtown Austin Veteran Home',
    city: 'Austin, TX',
    description: 'Beautifully renovated 3-bedroom home in downtown Austin, perfect for veterans starting a new chapter in life.',
    budget_range: '$350k-$450k',
    veteran_focus: true,
    section8_eligible: true,
    typical_rent_range: '$1,800-$2,200',
    accessibility_features: ['Zero-step entry', '36" doorways', 'Lowered cabinets'],
    tags: ['Downtown', 'Renovated', '3 bedroom', 'Historic District'],
    status: 'Available',
    address: '789 Congress Avenue, Austin, TX 78701',
    bedrooms: 3,
    bathrooms: 2,
    sq_footage: 1800,
    year_built: 1925,
    renovation_details: [
      'Complete interior renovation preserving historic charm',
      'Modern appliances and fixtures',
      'Hardwood floors throughout',
      'Updated electrical and plumbing',
      'Accessible ramp and entryway'
    ],
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  },
  {
    slug: 'south-austin-family-home',
    title: 'South Austin Family Home',
    city: 'Austin, TX',
    description: 'Spacious family home with modern updates and Section 8 eligibility, ideal for veterans with growing families.',
    budget_range: '$275k-$375k',
    veteran_focus: true,
    section8_eligible: true,
    typical_rent_range: '$1,500-$1,900',
    accessibility_features: ['Ground floor bedroom', 'Roll-in shower'],
    tags: ['Family friendly', 'Garden', '4 bedroom', 'Section 8'],
    status: 'Available',
    address: '456 South Lamar Blvd, Austin, TX 78704',
    bedrooms: 4,
    bathrooms: 3,
    sq_footage: 2200,
    year_built: 1995,
    renovation_details: [
      'Expanded kitchen with island',
      'New HVAC system',
      'Updated bathrooms',
      'Energy-efficient windows',
      'Fenced backyard with mature trees'
    ],
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  },
  {
    slug: 'east-austin-townhouse',
    title: 'East Austin Townhouse',
    city: 'Austin, TX',
    description: 'Modern townhouse in vibrant East Austin, Section 8 approved with excellent transit access.',
    budget_range: '$200k-$300k',
    veteran_focus: false,
    section8_eligible: true,
    typical_rent_range: '$1,200-$1,600',
    accessibility_features: ['Elevator access', 'Accessible parking'],
    tags: ['Townhouse', 'Transit', '2 bedroom', 'Modern'],
    status: 'Available',
    address: '321 East 5th St, Austin, TX 78702',
    bedrooms: 2,
    bathrooms: 2.5,
    sq_footage: 1400,
    year_built: 2010,
    renovation_details: [
      'Contemporary finishes throughout',
      'Stainless steel appliances',
      'Wood-style laminate flooring',
      'Private balcony',
      'Reserved parking space'
    ],
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  },
  {
    slug: 'north-austin-bungalow',
    title: 'North Austin Bungalow',
    city: 'Austin, TX',
    description: 'Charming renovated bungalow with veteran focus, offering tranquility and convenience in North Austin.',
    budget_range: '$225k-$325k',
    veteran_focus: true,
    section8_eligible: false,
    accessibility_features: ['Level entry', 'No-stair access'],
    tags: ['Bungalow', 'Quiet neighborhood', '2 bedroom', 'Veteran focused'],
    status: 'Available',
    address: '159 Ridgeview Dr, Austin, TX 78752',
    bedrooms: 2,
    bathrooms: 1,
    sq_footage: 1100,
    year_built: 1958,
    renovation_details: [
      'Restored original hardwood floors',
      'Updated kitchen with vintage touches',
      'Expanded bathroom',
      'Covered front porch',
      'Large backyard'
    ],
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  },
  {
    slug: 'west-austin-contemporary',
    title: 'West Austin Contemporary',
    city: 'Austin, TX',
    description: 'Contemporary home with hill country views, renovated for accessibility and modern living.',
    budget_range: '$400k-$500k',
    veteran_focus: true,
    section8_eligible: false,
    accessibility_features: [
      'Zero-threshold showers',
      '42" doorways',
      'Accessible lighting controls',
      'Lowered countertops'
    ],
    tags: ['Contemporary', 'Hill Country views', '4 bedroom', 'Luxury renovation'],
    status: 'Available',
    address: '852 Hillcrest Rd, Austin, TX 78746',
    bedrooms: 4,
    bathrooms: 3.5,
    sq_footage: 3200,
    year_built: 2015,
    renovation_details: [
      'Complete accessibility retrofit',
      'Gourmet kitchen with professional appliances',
      'Master suite with spa-like bathroom',
      'Home office with built-in storage',
      'Outdoor living spaces with hill country views'
    ],
    created_at: admin.firestore.Timestamp.now(),
    updated_at: admin.firestore.Timestamp.now()
  }
];

async function populateTestData() {
  console.log('🚀 Starting test data population...');

  try {
    const batch = db.batch();

    // Clear existing projects
    const existingProjects = await db.collection('projects').get();
    console.log(`🗑️ Clearing ${existingProjects.size} existing projects...`);
    existingProjects.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Add sample projects
    console.log('📝 Adding sample projects...');
    sampleProjects.forEach((project) => {
      const docRef = db.collection('projects').doc(project.slug);
      batch.set(docRef, project);
      console.log(`✓ Added: ${project.title}`);
    });

    await batch.commit();

    console.log('🎉 Test data population completed successfully!');
    console.log(`📊 Added ${sampleProjects.length} sample projects`);
    console.log('\n📋 Sample project slugs for testing:');
    sampleProjects.forEach(project => console.log(`   /projects/${project.slug}`));

  } catch (error) {
    console.error('❌ Error populating test data:', error);
    process.exit(1);
  }

  // Close admin connection
  if (admin.apps.length > 0) {
    await admin.app().delete();
  }

  console.log('👋 Done!');
}

// Run population
populateTestData();
