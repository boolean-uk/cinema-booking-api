const router = require("express").Router();
const { createTicket } = require("../controllers/tickets");

//Create a ticket
router.post("/", createTicket);

module.exports = router;
