import express from 'express'
import * as customerController from '../controllers/customers'

const router = express.Router()

router.post('/register', customerController.createCustomer)
router.put('/:id', customerController.updateCustomer)

export default router
