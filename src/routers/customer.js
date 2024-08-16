const express = require("express");
const { createCustomer, updateCustomer } = require("../controllers/customer");

const router = express.Router();

// In server.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register
router.post("/register", createCustomer);
router.put("/:id", updateCustomer);

module.exports = router;
