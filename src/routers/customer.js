const express = require("express");
const router = express.Router();

const {
  createCustomer,
  updateCustomer
} = require('../controllers/customer');

router.post("/register", createCustomer);
router.put("/:id", updateCustomer);

module.exports = router;
