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

export const updateCustomer = async (name: string, id: number) =>
    await prisma.customer.update({
        data: {
            name,
        },
        where: {
            id: id,
        },
        include: {
            contact: true,
        },
    })
