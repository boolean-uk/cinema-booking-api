import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import * as db from '../domains/customers'
import { Response, Request } from 'express'

export const createCustomer = async (req: Request, res: Response) => {
    const { name, phone, email } = req.body

    if (!name || !phone || !email) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdCustomer = await db.createCustomer(name, phone, email)

        res.status(201).json({ customer: createdCustomer })
    } catch (e: any) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(409).json({
                    error: 'A customer with the provided email already exists',
                })
            }
        }

        res.status(500).json({ error: e.message })
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    if (!name) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const updatedCustomer = await db.updateCustomer(name, id)

        res.status(201).json({ customer: updatedCustomer })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
    }
}
