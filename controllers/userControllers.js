/**
 * userControllers.js
 *
 * Handles the user management logic for the JaMoveo app:
 * - Fetching authenticated user info
 * - Creating a new player or admin
 * - Returning instrument options
 */

const asyncHandler = require('express-async-handler');
const { findUserByFirebaseUID, createUser, listInstruments } = require('../services/userService')
const { userDto } = require('../dto/userDTO');

/**
 * @route   GET /api/user/user
 * @desc    Get the currently authenticated user
 * @access  Protected (requires Firebase token)
 */
const getUser = asyncHandler(async (req, res) => {
    try {
        const firebaseUID = req.firebaseUID;
        if (!firebaseUID) {
            throw new Error("firebaseUID is required");
        }
        const user = await findUserByFirebaseUID(firebaseUID);
        if (user) {
            return res.status(200).json({ message: "User retrieved successfully", data: userDto(user) });
        } else {
            throw new Error("Invalid User Data");
        }
    } catch (error) {
        throw new Error("Internal server error");
    }
})

/**
 * @route   POST /api/user/user
 * @desc    Create a new user with "player" role
 * @access  Protected
 */
const createNewUser = asyncHandler(async (req, res) => {
    try {
        const firebaseUID = req.firebaseUID;
        const userEmail = req.userEmail;
        const { instrument } = req.body;

        if (!firebaseUID || !userEmail) {
            throw new Error("firebaseUID and userEmail is required");
        }

        const newUser = {
            firebaseUID,
            userEmail,
            instruments: instrument
        };

        const userCreated = await createUser(newUser);
        if (userCreated) {
            return res.status(201).json({ message: "User created successfully", data: userDto(userCreated) });
        } else {
            throw new Error("Invalid User Data");
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

/**
 * @route   POST /api/user/userAdmin
 * @desc    Create a new user with "admin" role
 * @access  Protected
 */
const createNewAdminUser = asyncHandler(async (req, res) => {
    try {
        const firebaseUID = req.firebaseUID;
        const userEmail = req.userEmail;

        if (!firebaseUID || !userEmail) {
            throw new Error("firebaseUID and userEmail is required");
        }

        const newUser = {
            firebaseUID,
            userEmail,
            role: 'admin'
        };

        const userCreated = await createUser(newUser);
        if (userCreated) {
            return res.status(201).json({ message: "User created successfully", data: userDto(userCreated) });
        } else {
            throw new Error("Invalid User Data");
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

/**
 * @route   GET /api/user/instruments
 * @desc    Returns a list of all available instrument options
 * @access  Public
 */
const getInstruments = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: "Instruments retrieved successfully", data: listInstruments() });
})

module.exports = {
    getUser,
    createNewUser,
    createNewAdminUser,
    getInstruments
}