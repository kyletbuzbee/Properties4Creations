"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.processLead = exports.submitLead = void 0;
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-functions/v2/firestore");
const app_1 = require("firebase-admin/app");
const firestore_2 = require("firebase-admin/firestore");
const admin = __importStar(require("firebase-admin"));
(0, app_1.initializeApp)();
const db = (0, firestore_2.getFirestore)();
// 🔥 Lead Submission Handler
exports.submitLead = (0, https_1.onCall)({
    region: 'us-central1',
    memory: '256MiB'
}, async (request) => {
    var _a, _b;
    const { name, email, type, city, message, veteran_status, section8_status } = request.data;
    if (!name || !email || !type || !city) {
        throw new https_1.HttpsError('invalid-argument', 'Missing required fields');
    }
    try {
        const leadRef = db.collection('leads').doc();
        await leadRef.set({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            type,
            city: city.trim(),
            message: (message === null || message === void 0 ? void 0 : message.trim()) || '',
            veteran_status: veteran_status || false,
            section8_status: section8_status || false,
            status: 'pending',
            crm_status: 'queued',
            ip_address: ((_a = request.rawRequest) === null || _a === void 0 ? void 0 : _a.ip) || '',
            user_agent: ((_b = request.rawRequest) === null || _b === void 0 ? void 0 : _b.get('User-Agent')) || '',
            created_at: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, leadId: leadRef.id };
    }
    catch (error) {
        console.error('Lead submission error:', error);
        throw new https_1.HttpsError('internal', 'Failed to submit lead');
    }
});
// 📊 Lead Processing (Firestore Trigger)
exports.processLead = (0, firestore_1.onDocumentCreated)('leads/{leadId}', (event) => {
    var _a, _b, _c;
    const leadId = event.params.leadId;
    const leadData = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!leadData) {
        console.error('No lead data found');
        return;
    }
    console.log(`Processing lead ${leadId} for ${leadData.email}`);
    try {
        // Send welcome email via SendGrid (placeholder)
        console.log(`Sending welcome email to ${leadData.email}`);
        // Update lead status
        return (_b = event.data) === null || _b === void 0 ? void 0 : _b.ref.update({
            status: 'processed',
            crm_status: 'created',
            processed_at: admin.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log(`Lead ${leadId} processed successfully`);
        }).catch((error) => {
            var _a;
            console.error(`Error processing lead ${leadId}:`, error);
            // Log error in lead document for debugging
            return (_a = event.data) === null || _a === void 0 ? void 0 : _a.ref.update({
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
    }
    catch (error) {
        console.error(`Error processing lead ${leadId}:`, error);
        // Log error in lead document for debugging
        return (_c = event.data) === null || _c === void 0 ? void 0 : _c.ref.update({
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
exports.getProjects = (0, https_1.onCall)({
    region: 'us-central1',
    memory: '128MiB'
}, async () => {
    try {
        const projectsSnapshot = await db.collection('projects')
            .orderBy('created_at', 'desc')
            .limit(6)
            .get();
        const projects = projectsSnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        return { projects };
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        throw new https_1.HttpsError('internal', 'Failed to fetch projects');
    }
});
//# sourceMappingURL=index.js.map