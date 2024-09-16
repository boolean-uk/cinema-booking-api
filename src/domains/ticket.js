const prisma = require('../utils/prisma')

// CREATE A TICKET
const createTicketDb = async (screeningId, customerId) => await prisma.ticket.create({
    data: {
        screeningId,
        customerId
     },
     include: {
        screening: {
            include: {
                movie: true,
                screen: true
            }
        },
        customer: {
            include:
            {contact: true}
        }
     }
})

const checkScreeningIdDb = async (screeningId) => await prisma.screening.findUnique({
    where: { id: screeningId }
})

const checkCustomerIdDb = async (customerId) => await prisma.customer.findUnique({
    where: { id: customerId }
})

module.exports = { createTicketDb, checkScreeningIdDb, checkCustomerIdDb }