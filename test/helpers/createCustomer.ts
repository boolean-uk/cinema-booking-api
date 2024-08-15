import prisma from '../../src/utils/prisma'

const createCustomer = async (name: string, phone: string, email: string) => {
    return await prisma.customer.create({
        data: {
            name: name,
            contact: {
                create: {
                    phone: phone,
                    email: email,
                },
            },
        },
    })
}

export default createCustomer
