const admin = require('firebase-admin');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    
    if (!token) {
        throw new Error("Authorization token is required");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.firebaseUID = decodedToken.uid;
        req.userEmail = decodedToken.email;
        next();
    } catch (error) {
        throw new Error(error);
    }
})
module.exports = { authMiddleware }