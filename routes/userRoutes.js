const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getUser, createNewUser, createNewAdminUser, getInstruments } = require("../controllers/userControllers");

router.get('/user', authMiddleware, getUser)
router.post('/user', authMiddleware, createNewUser)
router.post('/userAdmin', authMiddleware, createNewAdminUser)
router.get('/instruments', getInstruments)

module.exports = router