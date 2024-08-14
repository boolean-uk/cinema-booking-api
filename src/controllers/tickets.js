const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createdTicketdb } = require("../domains/tickets");

const createTicket = async (req, res) => {
  try {
    const { screeningId, customerId } = req.body;
    const createdTicket = await createdTicketdb(screeningId, customerId);

    res.status(201).json({ ticket: createdTicket });
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = {
  createTicket,
};