const prisma = require("../utils/prisma");

const createTicketDb = async (screeningId, customerId) => {
  const screening = await prisma.screening.findUnique({
    where: { id: screeningId },
  });
  if (!screening) {
    throw new Error("id not found");
  }
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  if (!customer) {
    throw new Error("id not found");
  }

  const createdTicket = await prisma.ticket.create({
    data: {
      screeningId,
      customerId,
    },
    include: {
      screening: {
        include: {
          movie: true,
          screen: true,
        },
      },
      customer: {
        include: {
          contact: true,
        },
      },
    },
  });
  return createdTicket;
};

module.exports = {
  createTicketDb,
};
