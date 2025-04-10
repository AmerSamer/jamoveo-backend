const asyncHandler = require('express-async-handler');
const { findUserByFirebaseUID } = require('../services/userService');

const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const firebaseUID = req.firebaseUID;
        if (!firebaseUID) {
            throw new Error("User not authenticated");
        }
        
        const user = await findUserByFirebaseUID(firebaseUID);

        if (!user) {
            throw new Error("User not found");
        } else if (user.role !== 'admin') {
            throw new Error("User not admin");
        }
        next();
    } catch (error) {
        throw new Error(error);
    }
})
module.exports = { adminAuthMiddleware }