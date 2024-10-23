const express = require("express");
const { createCustomer} = require('../controllers/customer');
const prisma = require("../utils/prisma.js");
const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register

router.post("/register", createCustomer);

// Put  Request

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Basic input validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Invalid input: name is required" });
    }

    // Check if the customer exists before trying to update
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Perform the update
    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
      include: {
        contact: true,
      },
    });

    res.status(201).json({ customer });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "An error occurred while updating the customer" });
  }
});


module.exports = router;
