const prisma = require("../utils/prisma");

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const createCustomerDb = async (name, phone, email) =>
  await prisma.customer.create({
    data: {
      name,
      contact: {
        create: {
          phone: phone,
          email: email,
        },
      },
    },
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

const updateCustomerDb = async (reqId, name, contact) =>
  await prisma.customer.update({
    where: {
      id: reqId,
    },
    data: {
      name,
      contact: contact
        ? {
            update: {
              phone: contact.phone ?? undefined,
              email: contact.email ?? undefined,
            },
          }
        : undefined,
    },
    include: { contact: true },
  });

module.exports = {
  createCustomerDb,
  updateCustomerDb,
};
