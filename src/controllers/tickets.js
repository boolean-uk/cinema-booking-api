const { findCustomerByIdDb } = require("../domains/customers")
const { findScreeningByIdDb } = require("../domains/screenings")
const { createTicketDb } = require("../domains/tickets")
//Handles the creation of a ticket and extracts screeningId and customerId
const createTicket = async (req, res) => {
  try {
    const { screeningId, customerId } = req.body

    if (!screeningId || !customerId) {
      return res.status(400).send({ error: "Missing fields in request body" })
    }

    const foundCustomer = await findCustomerByIdDb(customerId)
    const foundScreening = await findScreeningByIdDb(screeningId)

    if (!foundScreening || !foundCustomer) {
      return res.status(404).send({
        error: "A customer or screening does not exist with the provided id",
      })
    }

    const createdTicket = await createTicketDb(screeningId, customerId)
    return res.status(201).send({ ticket: createdTicket })
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({ error: e.message })
  }
}

module.exports = {
  createTicket,
}
