const express = require("express");
const router = express.Router();
const { createAnotherScreen } = require("../controllers/screen");

router.post("/", createAnotherScreen );

module.exports = router;
