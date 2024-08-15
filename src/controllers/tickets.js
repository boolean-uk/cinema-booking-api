const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createTicketDb } = require("../domains/tickets.js");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdTicket = await createTicketDb(screeningId, customerId);

    res.status(201).json({ ticket: createdTicket });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createTicket,
};
