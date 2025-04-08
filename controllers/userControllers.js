const asyncHandler = require('express-async-handler');
const { findUserByFirebaseUID } = require('../services/userService')
const { userDto } = require('../dto/userDTO');

const getUser = asyncHandler(async (req, res) => {
    try {
        return res.status(200).json({ message: "User retrieved successfully" });
    } catch (error) {
        throw new Error("Internal server error");
    }
})

module.exports = {
    getUser
}