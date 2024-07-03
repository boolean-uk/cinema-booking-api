const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createTicketDB } = require("../domains/ticket")
const { getAllCustomersDb } = require('../domains/customer')
const { getAllScreeningsDb } = require('../domains/screening')

const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors")

const createTicket = async (req, res, next) => {
    const { screeningId, customerId } = req.body
    
    const customers = await getAllCustomersDb()
    const existingCustomer = customers.find(cus => cus.id === customerId)
    const screenings = await getAllScreeningsDb()
    const existingScreening = screenings.find(scr => scr.id === screeningId)

	try {
		if (!screeningId || !customerId) {
			throw new MissingFieldsError(
				"Screening and Customer ID must be provided in order to create a ticket"
			)
        }
        
        if (!existingScreening || !existingCustomer) {
            throw new DataNotFoundError(
							"No customer or screening exist with the provided id"
						)
        }
		const newTicket = await createTicketDB(screeningId, customerId)
		res.status(201).json({ ticket: newTicket })
	} catch (e) {
		console.log(e)
		next(e)
	}
}

module.exports = { createTicket }
