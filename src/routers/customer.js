const express = require("express");
const { createCustomer } = require("../controllers/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json("bruh");
});

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register
router.post("/register", createCustomer);

module.exports = router;
