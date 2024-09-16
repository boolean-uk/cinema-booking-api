const express = require("express");
const { createCustomer, updateCustomer } = require('../controllers/customer.js');
const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register
router.post("/register", createCustomer);

// UPDATE CUSTOMER BY ID
router.put('/:id', updateCustomer)

module.exports = router;
