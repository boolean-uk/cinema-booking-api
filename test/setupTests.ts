import prisma from '../src/utils/prisma'

const deleteTables = () => {
    const deleteTables = [
        prisma.ticket.deleteMany(),
        prisma.screening.deleteMany(),
        prisma.movie.deleteMany(),
        prisma.screen.deleteMany(),
        prisma.contact.deleteMany(),
        prisma.customer.deleteMany(),
    ]

    // Conditionally delete this table as this will only exist if "Extensions to the Extensions" bullet 2 is implemented

    // prisma.reviews && deleteTables.push(prisma.reviews.deleteMany())
    return prisma.$transaction(deleteTables)
}

global.beforeAll(() => {
    return deleteTables()
})

global.afterEach(() => {
    return deleteTables()
})

global.afterAll(() => {
    return prisma.$disconnect()
})
