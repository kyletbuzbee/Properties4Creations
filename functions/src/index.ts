import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

initializeApp();
const db = getFirestore();

// 🔥 Lead Submission Handler
export const submitLead = onCall({
  region: 'us-central1',
  memory: '256MiB'
}, async (request) => {
  const { name, email, type, city, message, veteran_status, section8_status } = request.data;

  if (!name || !email || !type || !city) {
    throw new HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    const leadRef = db.collection('leads').doc();
    await leadRef.set({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      type,
      city: city.trim(),
      message: message?.trim() || '',
      veteran_status: veteran_status || false,
      section8_status: section8_status || false,
      status: 'pending',
      crm_status: 'queued',
      ip_address: request.rawRequest?.ip || '',
      user_agent: request.rawRequest?.get('User-Agent') || '',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, leadId: leadRef.id };
  } catch (error) {
    console.error('Lead submission error:', error);
    throw new HttpsError('internal', 'Failed to submit lead');
  }
});

// 📊 Lead Processing (Firestore Trigger)
export const processLead = onDocumentCreated(
  'leads/{leadId}',
  (event) => {
    const leadId = event.params.leadId;
    const leadData = event.data?.data();

    if (!leadData) {
      console.error('No lead data found');
      return;
    }

    console.log(`Processing lead ${leadId} for ${leadData.email}`);

    try {
      // Send welcome email via SendGrid (placeholder)
      console.log(`Sending welcome email to ${leadData.email}`);

      // Update lead status
      return event.data?.ref.update({
        status: 'processed',
        crm_status: 'created',
        processed_at: admin.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        console.log(`Lead ${leadId} processed successfully`);
      }).catch((error: any) => {
        console.error(`Error processing lead ${leadId}:`, error);

        // Log error in lead document for debugging
        return event.data?.ref.update({
          status: 'error',
          crm_status: 'error',
          processing_log: admin.firestore.FieldValue.arrayUnion({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            action: 'process_lead',
            result: 'error',
            error: error.message
          })
        });
      });
    } catch (error: any) {
      console.error(`Error processing lead ${leadId}:`, error);

      // Log error in lead document for debugging
      return event.data?.ref.update({
        status: 'error',
        crm_status: 'error',
        processing_log: admin.firestore.FieldValue.arrayUnion({
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          action: 'process_lead',
          result: 'error',
          error: error.message
        })
      });
    }
  });

// 📊 Get Projects for Homepage (Server-side)
export const getProjects = onCall({
  region: 'us-central1',
  memory: '128MiB'
}, async () => {
  try {
    const projectsSnapshot = await db.collection('projects')
      .orderBy('created_at', 'desc')
      .limit(6)
      .get();

    const projects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new HttpsError('internal', 'Failed to fetch projects');
  }
});
