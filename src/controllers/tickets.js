const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createdTicketdb } = require("../domains/tickets");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdTicket = await createdTicketdb(screeningId, customerId);

    res.status(201).json({ ticket: createdTicket });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return res.status(404).json({
          error: "A customer or screening does not exist with the provided id",
        });
      }
    }
    res.status(500).json({ error: err.message });

  }
};

module.exports = {
  createTicket,
};
