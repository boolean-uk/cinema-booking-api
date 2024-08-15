const express = require("express");
const { createScreen } = require("../controllers/screens");

const router = express.Router();

router.post("/", createScreen);

module.exports = router;
