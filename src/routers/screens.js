const express = require("express");
const router = express.Router();

const {
    createScreen,
} = require('../controllers/screens');

router.post('/', createScreen);

module.exports = router;
