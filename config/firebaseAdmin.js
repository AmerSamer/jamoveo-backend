/**
 * firebaseAdmin.js
 *
 * Initializes Firebase Admin SDK to enable secure server-side operations like:
 * - Verifying Firebase ID tokens
 * - Accessing user data or custom claims
 *
 * Uses a Base64-encoded service account passed via environment variable.
 */

const admin = require('firebase-admin');

// 🔐 Decode and parse the Base64-encoded Firebase service account JSON
const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
);

/**
 * connectFirebaseAdmin
 * Initializes Firebase Admin SDK using service account credentials.
 */
const connectFirebaseAdmin = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log(`Firebase Admin initialized successfully`.cyan.underline);
    } catch (error) {
        console.log(`Error Firebase Admin: ${error.message}`.red.underline.bold)
        process.exit(1) // Exit app if Firebase initialization fails
    }
}

module.exports = connectFirebaseAdmin

