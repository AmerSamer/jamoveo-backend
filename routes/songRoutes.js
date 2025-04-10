const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { adminAuthMiddleware } = require('../middleware/adminAuthMiddleware')
const { getSongs, getSong, addSong } = require("../controllers/songControllers");

router.get('/songs', authMiddleware, adminAuthMiddleware, getSongs)
router.get('/song/:file', authMiddleware, adminAuthMiddleware, getSong)
router.post('/song', authMiddleware, adminAuthMiddleware, addSong)

module.exports = router