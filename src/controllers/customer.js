const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createCustomerDb, updateCustomerDb, updateContactDb, checkCustomerIdDb } = require('../domains/customer.js')

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  // Try-catch is a very common way to handle errors in JavaScript.
  // It allows us to customise how we want errors that are thrown to be handled.
  // Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

  // Here, if Prisma throws an error in the process of trying to create a new customer,
  // instead of the Prisma error being thrown (and the app potentially crashing) we exit the
  // `try` block (bypassing the `res.status` code) and enter the `catch` block.
  try {
    const createdCustomer = await createCustomerDb(name, phone, email)

    res.status(201).json({ customer: createdCustomer })
  } catch (e) {
    // In this catch block, we are able to specify how different Prisma errors are handled.
    // Prisma throws errors with its own codes. P2002 is the error code for
    // "Unique constraint failed on the {constraint}". In our case, the {constraint} is the
    // email field which we have set as needing to be unique in the prisma.schema.
    // To handle this, we return a custom 409 (conflict) error as a response to the client.
    // Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference#common
    // HTTP error codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A customer with the provided email already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const updateCustomer = async (req, res) => {
  const id = Number(req.params.id)

  // check customer id is valid
  const customerExists = await checkCustomerIdDb(id)
  if (!customerExists) return res.status(404).json({ error: `Customer with id ${id} does not exist!` })

  // check the name field is not missing (contact optional so no check needed)
  const { name, contact } = req.body
  if (!name) return res.status(400).json({ error: "Oh no, you need to enter a name to update!" })

  // if contact details provided update contact first, else skip to update customer
  if (contact) await updateContactDb(id, contact)

  // finally update customer
  const updatedCustomer = await updateCustomerDb(id, name)
  return res.status(201).json({ customer: updatedCustomer })
}

module.exports = { createCustomer, updateCustomer }
