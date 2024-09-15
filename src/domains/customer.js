const prisma = require('../utils/prisma')

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
  include: {
    contact: true
  }
})

const updateCustomerDb = async (id, name, phone, email) => await prisma.customer.update({
  where: {
    id: id
  },
  data: {
    name,
    contact: {
      update: {
        phone,
        email
      }
    }
  },
  include: {
    contact: true
  }
})

module.exports = {
  createCustomerDb,
  updateCustomerDb
}
