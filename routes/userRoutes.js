const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getUser } = require("../controllers/userControllers");

router.get('/user', getUser)

module.exports = router