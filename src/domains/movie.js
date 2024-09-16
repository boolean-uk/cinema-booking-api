const prisma = require('../utils/prisma')

// GET MOVIE LIST
const getMovieListDb = async () => await prisma.movie.findMany({
    include: { screenings: true }
})

// GREATER THAN AND LESS THAN RT
const getMovieListGtLtDb = async (runtimeLt, runtimeGt) => await prisma.movie.findMany({
    where: {
        OR: [
            {
                runtimeMins: { gt: runtimeGt }
            },
            {
                runtimeMins: { lt: runtimeLt }
            }
        ]
    },
    include: { screenings: true }
})

// GREATER THAN RT
const getMovieListGtDb = async (runtimeGt) => await prisma.movie.findMany({
    where: {
        runtimeMins: { gt: runtimeGt }
    },
    include: { screenings: true }
})

// LESS THAN LT
const getMovieListLtDb = async (runtimeLt) => await prisma.movie.findMany({
    where: {
        runtimeMins: { lt: runtimeLt }
    },
    include: { screenings: true }
})

// CREATE MOVIE
const createMovieDb = async (title, runtimeMins) => await prisma.movie.create({
    data: {
        title,
        runtimeMins
    },
    include: { screenings: true }
})

const createMovieAndScreeningDb = async (title, runtimeMins, screenings) => await prisma.movie.create({
    data: {
        title,
        runtimeMins,
        screenings : {
            create: screenings
        }
    },
    include: { screenings: true }
})

// GET MOVIE BY TITLE
const getMovieByTitleDb = async (title) => await prisma.movie.findFirst({
    where: { title }
})

// GET MOVIE BY ID
const getMovieByIdDb = async (id) => await prisma.movie.findUnique({
    where: { id },
    include: { screenings: true }
})

// UPDATE MOVIE BY ID
const updateMovieDb = async (id, title, runtimeMins) => await prisma.movie.update({
    where: { id },
    data: {
        title,
        runtimeMins
    },
    include: { screenings: true }
})

module.exports = { getMovieListDb, createMovieDb, getMovieByIdDb, updateMovieDb, getMovieListGtLtDb, getMovieListGtDb, getMovieListLtDb, createMovieAndScreeningDb, getMovieByTitleDb }