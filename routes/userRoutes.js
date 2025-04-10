/**
 * userRoutes.js
 *
 * Defines API endpoints for managing users in the JaMoveo app.
 * Includes:
 * - Authenticated user data fetching
 * - New user and admin creation
 * - Instrument list retrieval
 */

const express = require('express')
const router = express.Router()

// Middleware to verify Firebase token and attach user info
const { authMiddleware } = require('../middleware/authMiddleware')

// Controller functions
const { getUser, createNewUser, createNewAdminUser, getInstruments } = require("../controllers/userControllers");

/**
 * @route   GET /api/user/user
 * @desc    Get the currently authenticated user from the database
 * @access  Protected (requires Firebase Auth token)
 */
router.get('/user', authMiddleware, getUser)

/**
 * @route   POST /api/user/user
 * @desc    Create a new user (player)
 * @access  Protected
 */
router.post('/user', authMiddleware, createNewUser)

/**
 * @route   POST /api/user/userAdmin
 * @desc    Create a new user with admin role
 * @access  Protected
 */
router.post('/userAdmin', authMiddleware, createNewAdminUser)

/**
 * @route   GET /api/user/instruments
 * @desc    Get list of available instruments (enum values)
 * @access  Public
 */
router.get('/instruments', getInstruments)

module.exports = router