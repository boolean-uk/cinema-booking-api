const prisma = require('../utils/prisma');

const createScreenDb = async (number) => {
    try {
return await prisma.screen.create({
    data: {
        number
    }
})
    } catch (error) {
        throw error
    }
}




module.exports = { createScreenDb }