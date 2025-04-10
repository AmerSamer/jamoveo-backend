/**
 * adminAuthMiddleware.js
 *
 * Middleware to protect routes accessible only by admin users.
 * - Assumes Firebase token was already verified by authMiddleware
 * - Retrieves user from MongoDB using Firebase UID
 * - Checks for role === 'admin'
 */

const asyncHandler = require('express-async-handler');
const { findUserByFirebaseUID } = require('../services/userService');

const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const firebaseUID = req.firebaseUID;
        if (!firebaseUID) {
            throw new Error("User not authenticated");
        }

        // 🧾 Fetch user from DB
        const user = await findUserByFirebaseUID(firebaseUID);

        // 🚫 Check admin role
        if (!user) {
            throw new Error("User not found");
        } else if (user.role !== 'admin') {
            throw new Error("User not admin");
        }

        // ✅ Pass to next middleware/route
        next();
    } catch (error) {
        throw new Error(error);
    }
})
module.exports = { adminAuthMiddleware }