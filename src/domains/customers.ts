import { Prisma } from '@prisma/client'
import prisma from '../utils/prisma'

export const createCustomer = async (
    name: string,
    phone: string,
    email: string
) =>
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
        include: {
            contact: true,
        },
    })

export const updateCustomer = async (
    name: string,
    id: number,
    contact?: Prisma.ContactUpdateInput
) =>
    await prisma.customer.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            contact: {
                update: {
                    phone: contact?.phone,
                    email: contact?.email,
                },
            },
        },
        include: {
            contact: true,
        },
    })
