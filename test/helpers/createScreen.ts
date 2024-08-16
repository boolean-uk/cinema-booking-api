import prisma from '../../src/utils/prisma'

const createScreen = async (number: number) => {
    return await prisma.screen.create({
        data: {
            number: number,
        },
    })
}

export default createScreen
