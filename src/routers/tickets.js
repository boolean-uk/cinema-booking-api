const express = require("express");
const { createTicket } = require("../controllers/tickets");

const router = express.Router();

router.post("/", createTicket);

module.exports = router;
