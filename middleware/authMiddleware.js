/**
 * authMiddleware.js
 *
 * Middleware to verify Firebase ID tokens from incoming requests.
 * - Validates the token using Firebase Admin SDK
 * - Adds `firebaseUID` and `userEmail` to `req` for downstream access
 * - Must run before any route that relies on user identity or role
 */

const admin = require('firebase-admin');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    // Extract token from Authorization header (format: "Bearer <token>")
    const token = req.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
        throw new Error("Authorization token is required");
    }

    try {
        // ✅ Verify the token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach UID and email to request for later use
        req.firebaseUID = decodedToken.uid;
        req.userEmail = decodedToken.email;

        // Allow request to continue
        next();
    } catch (error) {
        throw new Error(error);
    }
})
module.exports = { authMiddleware }