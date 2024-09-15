const prisma = require('../utils/prisma')

const createScreenDb = async (number) => await prisma.screen.create({
    data: {
        number,
    }
})

module.exports = {
    createScreenDb
}