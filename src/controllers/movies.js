const { 
    getMoviesDb,
    getMovieByIdDb,
    createMovieDb,
    updateMovieDb 
} = require('../domains/movies')

const getMovies = async (req, res) => {
    try {
        const movies = await getMoviesDb()
        res.status(200).json({ movies: movies })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}

const getMovieById = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const movie = await getMovieByIdDb(id)
        res.status(200).json({ movie })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
}

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    try {
        const createdMovie = await createMovieDb(title, runtimeMins)

        res.status(201).json({ movie: createdMovie })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
}

const updateMovie = async (req, res) => {
    const { title, runtimeMins } = req.body
    const id = parseInt(req.params.id)

    try {
        const updatedMovie = await updateMovieDb(id, title, runtimeMins)

        res.status(201).json({ movie: updatedMovie })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie
}