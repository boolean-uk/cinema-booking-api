const prisma = require('../utils/prisma')

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const createCustomerDb = async (name, phone, email) => await prisma.customer.create({
  data: {
    name,
    contact: {
      create: {
        phone,
        email
      }
    }
  },
  // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
  // This is like doing RETURNING in SQL
  include: {
    contact: true
  }
})

// CHECK CUSTOMER ID
const checkCustomerIdDb = async (id) => await prisma.customer.findUnique({
  where: { id }
})

// UPDATE CUSTOMER BY ID
const updateCustomerDb = async (id, name) => await prisma.customer.update({
  where: { id },
  data: { name },
  include: { 
    contact: true,
    tickets: true
  }
})

const updateContactDb = async (id, contact) => await prisma.contact.update({
  where: { customerId: id },
  data: {
    phone: contact.phone,
    email: contact.email
   }
})

module.exports = { createCustomerDb, updateCustomerDb, updateContactDb, checkCustomerIdDb }
