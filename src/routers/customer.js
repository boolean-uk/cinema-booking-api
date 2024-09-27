const express = require("express");
const { createCustomer, updateCustomer } = require("../controllers/customer");


const router = express.Router();

router.post("/register", createCustomer);
router.put("/:id", updateCustomer);


module.exports = router;
