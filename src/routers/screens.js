const express = require("express");
const prisma = require("../utils/prisma.js");
const { response } = require("../server.js");

const router = express.Router();

// THE SOLE POST REQUEST

router.post("/", async (req, res) => {
  const screen = await prisma.screen.create({
    data: {
      number: Number(req.body.number),
    },
  });

  res.status(201).json({ screen });
});

module.exports = router;
