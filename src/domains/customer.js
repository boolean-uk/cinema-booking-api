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
          phone,
          email,
        },
      },
    },
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

const updateCustomer = async (id, name, phone, email) =>
  await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      contact: {
        update: {
          phone: phone,
          email: email,
        },
      },
    },
    include: {
      contact: true,
    },
  });
module.exports = {
  createCustomerDb,
  updateCustomer,
};
