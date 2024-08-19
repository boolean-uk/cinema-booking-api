const prisma = require("../utils/prisma");

const createdTicketdb = async (screeningId, customerId) =>
  await prisma.ticket.create({
    data: {
      screeningId,
      customerId,
    },
    include: {
      screening: true,
      screening: {
        include: {
          movie: true,
          screen: true,
        },
      },
      customer: true,
      customer: {
        include: {
          contact: true,
        },
      },
    },
  });

module.exports = {
  createdTicketdb,
};
