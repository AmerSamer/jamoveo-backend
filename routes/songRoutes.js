/**
 * songRoutes.js
 *
 * Defines all admin-protected routes for managing songs.
 * - Only accessible by authenticated users with an "admin" role.
 * - Includes listing songs, fetching a single song file, and adding new songs.
 */

const express = require('express')
const router = express.Router()

// Middleware
const { authMiddleware } = require('../middleware/authMiddleware')
const { adminAuthMiddleware } = require('../middleware/adminAuthMiddleware')

// Controllers
const { getSongs, getSong, addSong } = require("../controllers/songControllers");

/**
 * @route   GET /api/song/songs
 * @desc    Get all available songs
 * @access  Admin only
 */
router.get('/songs', authMiddleware, adminAuthMiddleware, getSongs)

/**
 * @route   GET /api/song/song/:file
 * @desc    Get a specific song by filename (e.g., Hey_Jude.json)
 * @access  Admin only
 */
router.get('/song/:file', authMiddleware, adminAuthMiddleware, getSong)

/**
 * @route   POST /api/song/song
 * @desc    Add a new song to the library
 * @access  Admin only
 */
router.post('/song', authMiddleware, adminAuthMiddleware, addSong)

module.exports = router