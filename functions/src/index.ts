/* eslint-disable camelcase */

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onCall} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead degrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
setGlobalOptions({maxInstances: 10});

// Lead submission Cloud Function
export const submitLead = onCall(
  {region: "us-central1"}, // Default region
  async (request) => {
    logger.info(
      "submitLead function called",
      {uid: request.auth?.uid, data: request.data}
    );

    try {
      // Validate required fields
      // eslint-disable-next-line camelcase
      const {
        name,
        email,
        city,
        type,
        message,
        phone,
        voucher_status,
        housing_authority,
        household_size,
        accessibility_needs,
        preferred_program,
        timestamp,
        source,
      } = request.data;

      if (!name || !email || !city || !type) {
        throw new Error("Missing required fields: name, email, city, type");
      }

      // Basic email validation (should match frontend regex)
      const emailRegex = new RegExp(
        "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
        "i"
      );
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      // Prepare lead data
      const leadData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        city: city.trim(),
        type,
        message: message?.trim() || null,
        phone: phone?.trim() || null,
        voucher_status: voucher_status || null,
        housing_authority: housing_authority?.trim() || null,
        household_size: household_size || null,
        accessibility_needs: accessibility_needs?.trim() || null,
        preferred_program: preferred_program || null,
        timestamp: timestamp || admin.firestore.Timestamp.now(),
        source: source || "website",
        status: "new",
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Save to Firestore
      const docRef = await admin.firestore().collection("leads").add(leadData);

      logger.info("Lead submitted successfully", {
        leadId: docRef.id,
        email: leadData.email,
        type: leadData.type,
      });

      return {
        success: true,
        leadId: docRef.id,
        message: "Lead submitted successfully",
      };
    } catch (error) {
      logger.error("Error in submitLead function", error);

      // Re-throw with user-friendly message
      if (error instanceof Error) {
        throw new Error(`Form submission failed: ${error.message}`);
      } else {
        throw new Error("Form submission failed due to an unknown error");
      }
    }
  }
);

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
