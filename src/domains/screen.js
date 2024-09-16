const prisma = require('../utils/prisma')

// CREATE A SCREEN
const createScreenDb = async (number) => await prisma.screen.create({
    data: { number }
})

const createScreenAndScreeningsDb = async (number, screenings) => await prisma.screen.create({
    data: {
        number,
        screenings: { create: screenings }
    },
    include: { screenings: true }
})

const getScreenByNum = async (number) => await prisma.screen.findFirst({
    where: { number }
})

module.exports = { createScreenDb, createScreenAndScreeningsDb, getScreenByNum }