const express = require('express')
const router = express.Router()

const { createScreen } = require('../controllers/screen.js')

// CREATE A SCREEN
router.post('/', createScreen)

module.exports = router