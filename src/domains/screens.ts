import prisma from '../utils/prisma'

export const createScreen = async (number: number) =>
    await prisma.screen.create({
        data: {
            number: number,
        },
    })
