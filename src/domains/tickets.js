const prisma = require("../utils/prisma");

const createTicketDb = async (screeningId, customerId) =>
  await prisma.ticket.create({
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

module.exports = {
  createTicketDb,
};
