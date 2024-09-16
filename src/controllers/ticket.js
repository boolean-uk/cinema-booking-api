const { createTicketDb, checkScreeningIdDb, checkCustomerIdDb } = require("../domains/ticket.js")

// CREATE A TICKET
const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body

    if (!screeningId || !customerId)
    return res.status(400).json({ error: "Missing fields in the request body, please include a screening ID and customer ID."})

    const checkScreeningId = await checkScreeningIdDb(screeningId)
    const checkCustomerId = await checkCustomerIdDb(customerId)

    if (!checkScreeningId || !checkCustomerId) 
    return res.status(404).json({ error: "A customer or screening does not exist with the provided ID."})

    const ticket = await createTicketDb(screeningId, customerId)
    return res.status(201).json({ ticket: ticket })
}

module.exports = { createTicket }
