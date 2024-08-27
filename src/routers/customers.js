const express = require("express");
const { createCustomer } = require("../controllers/customer");
const prisma = require("../utils/prisma");

const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register

// POST REQUESTS

router.post("/register", createCustomer);

// PUT REQUESTS

router.put("/:id", async (req, res) => {
  const customer = await prisma.customer.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: req.body.name,
    },
    include: {
      contact: true,
    },
  });

  res.status(201).json({ customer });
});

module.exports = router;
