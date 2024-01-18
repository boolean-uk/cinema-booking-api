const prisma = require('../utils/prisma')

const moviesDb = async () => await prisma.movie.findMany({
    include: {
       screenings: true
    }
});


const createMovieDb = async (req, res) => {
    const {title, runtimeMins} = req.body
    const movie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
            screenings: {}
        },
        include: {
            screenings: true
        }
    })
    return movie
}

const getMovieByIdDb = async (req, res) => {
    const id = Number(req.params.id)
    const movieId = await prisma.movie.findUnique({
        where: {
            id: id
        },
        include: {
            screenings: true
        }
    })
    return movieId
}

module.exports = {
    moviesDb,
    createMovieDb,
    getMovieByIdDb
}