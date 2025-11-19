#!/usr/bin/env node

/**
 * Firestore Seed Script
 *
 * Imports sample data into Firestore emulator or live project.
 *
 * Usage:
 *   FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seedFirestore.js  # Emulator
 *   GOOGLE_APPLICATION_CREDENTIALS=service-account.json node scripts/seedFirestore.js  # Live
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
if (process.env.FIRESTORE_EMULATOR_HOST) {
  // Running against emulator
  console.log('Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
  admin.initializeApp();
} else {
  // Running against live project
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('GOOGLE_APPLICATION_CREDENTIALS environment variable must be set for live seeding');
    process.exit(1);
  }

  const serviceAccount = require(path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Get Firestore instance
const db = admin.firestore();

// Sample data (in production, read from JSON files)
const projectsSeed = [
  {
    title: "123 Oak Street Renovation",
    slug: "oak-street-renovation",
    status: "Completed",
    city: "Austin, TX",
    neighborhood: "Downtown",
    description: "Complete kitchen and bathroom renovation for a veteran family.",
    budget_range: "$45k-$60k",
    veteran_focus: true,
    tags: ["Veteran", "Kitchen", "Bathroom"],
    timeline: [
      { date: admin.firestore.Timestamp.fromDate(new Date("2024-01-15")), milestone: "Initial Assessment" },
      { date: admin.firestore.Timestamp.fromDate(new Date("2024-05-01")), milestone: "Construction Start" },
      { date: admin.firestore.Timestamp.fromDate(new Date("2024-08-20")), milestone: "Completion" }
    ],
    permits: [{ permit_type: "Electrical", status: "Approved", cost: 500 }],
    lessons_learned: "Bathroom renovations provide highest ROI",
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    title: "Urban Loft Modernization",
    slug: "urban-loft-modernization",
    status: "In Progress",
    city: "Dallas, TX",
    description: "Converting a downtown loft into modern living space.",
    budget_range: "$75k-$90k",
    veteran_focus: false,
    tags: ["Loft", "Electrical", "HVAC"],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    title: "Family Home Renovation",
    slug: "family-home-renovation",
    status: "Planned",
    city: "Houston, TX",
    description: "Full home modernization for a growing veteran family.",
    budget_range: "$55k-$70k",
    veteran_focus: true,
    tags: ["Veteran", "Family Home", "Kitchen"],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  }
];

const teamMembersSeed = [
  {
    name: "Kyle Turner",
    role: "Founder & CEO",
    bio: "Veteran Navy member turned entrepreneur, Kyle founded Properties 4 Creation to help fellow veterans secure safe housing through expert renovations.",
    social_links: [{ platform: "LinkedIn", url: "https://linkedin.com/in/kyle-turner" }],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    bio: "With 10 years in construction management, Sarah ensures every P4C project is delivered on time and within budget.",
    social_links: [],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Contractor",
    bio: "Licensed contractor specializing in residential renovations, with a focus on elderly and veteran housing improvements.",
    social_links: [],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  }
];

const testimonialsSeed = [
  {
    author: "John Smith",
    role: "Veteran Soldier",
    content: "Kyle's team transformed our home into a dream. As a veteran, it means the world!",
    project_id: "oak-street-renovation", // Will be set after projects are created
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    author: "Jane Doe",
    role: "Homeowner",
    content: "Amazing renovations - the loft looks straight out of a magazine!",
    project_id: "urban-loft-modernization",
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    author: "Bob Williams",
    role: "Veteran",
    content: "P4C changes lives with their veteran-focused programs.",
    project_id: "family-home-renovation",
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  }
];

const resourcesSeed = [
  {
    title: "Complete Home Evaluation Guide",
    body: "Learn what to expect from professional evaluations...",
    category: "Guides",
    tags: [],
    attachments: [{ filename: "home-evaluation-guide.pdf", url: "gs://properties4creations.appspot.com/resources/guide.pdf", file_size: 2048576 }],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    title: "Veteran Housing Needs Survey",
    body: "Help us serve veterans better...",
    category: "Marketing Materials",
    tags: ["Survey", "Veterans"],
    attachments: [],
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seedData() {
  console.log('Starting Firestore seeding...');

  try {
    // Clear existing data (optional, only for development)
    console.log('Clearing existing documents...');

    // Delete existing docs (simplified - in production, use batch deletes)
    const collections = ['projects', 'teamMembers', 'testimonials', 'resources'];

    for (const collection of collections) {
      const snapshot = await db.collection(collection).get();
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Cleared ${snapshot.size} documents from ${collection}`);
    }

    // Seed projects
    console.log('Seeding projects...');
    const projectRefs = [];
    for (const project of projectsSeed) {
      const docRef = await db.collection('projects').add(project);
      projectRefs.push({ id: docRef.id, slug: project.slug });
      console.log(`Added project: ${project.title}`);
    }

    // Update testimonial project_ids with actual document IDs
    for (let i = 0; i < testimonialsSeed.length; i++) {
      const projectRef = projectRefs.find(p => p.slug === testimonialsSeed[i].project_id);
      if (projectRef) {
        testimonialsSeed[i].project_id = projectRef.id;
      }
    }

    // Seed team members
    console.log('Seeding team members...');
    for (const member of teamMembersSeed) {
      await db.collection('teamMembers').add(member);
      console.log(`Added team member: ${member.name}`);
    }

    // Seed testimonials
    console.log('Seeding testimonials...');
    for (const testimonial of testimonialsSeed) {
      await db.collection('testimonials').add(testimonial);
      console.log(`Added testimonial by: ${testimonial.author}`);
    }

    // Seed resources
    console.log('Seeding resources...');
    for (const resource of resourcesSeed) {
      await db.collection('resources').add(resource);
      console.log(`Added resource: ${resource.title}`);
    }

    console.log('Firestore seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1);
  }

  // Close admin connection
  if (admin.apps.length > 0) {
    await admin.app().delete();
  }
}

// Run the seeding
seedData();
