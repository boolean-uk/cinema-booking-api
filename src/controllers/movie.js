const { getMovieListDb, createMovieDb, getMovieByIdDb, updateMovieDb, getMovieListGtLtDb, getMovieListGtDb, getMovieListLtDb, createMovieAndScreeningDb, getMovieByTitleDb } = require('../domains/movie.js')

// GET MOVIE LIST
const getMovieList = async (req, res) => {
    if (req.query) {
        const runtimeLt = Number(req.query.runtimeLt)
        const runtimeGt = Number(req.query.runtimeGt)
        
        if (runtimeLt && runtimeGt) {
            const movieList = await getMovieListGtLtDb(runtimeLt, runtimeGt)
            return res.status(200).json({ movies: movieList })
        }
        if (runtimeLt) {
            const movieList = await getMovieListLtDb(runtimeLt)
            return res.status(200).json({ movies: movieList })
        }
        if (runtimeGt) {
            const movieList = await getMovieListGtDb(runtimeGt)
            return res.status(200).json({ movies: movieList })
        }
    }

    const movieList = await getMovieListDb()
    return res.status(200).json({ movies: movieList })
}

// CREATE MOVIE
const createMovie = async (req, res) => {
    const { title, runtimeMins, screenings } = req.body

    if (!title || !runtimeMins)
    return res.status(400).json({ error: "Missing fields in the request body, please enter the film title and runtime in minutes."})

    const titleExists = await getMovieByTitleDb(title)
    if (titleExists) return res.status(409).json({ error: "A movie with that title already exists!"})

    if (screenings) {
        const newMovieAndScreening = await createMovieAndScreeningDb(title, runtimeMins, screenings)
        return res.status(201).json({ movie: newMovieAndScreening })
    }
    
    const newMovie = await createMovieDb(title, runtimeMins)
    return res.status(201).json({ movie: newMovie })
}

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const foundMovie = await getMovieByIdDb(id)
    if (!foundMovie) return res.status(404).json({ error: "Movie does not exist"})
    
    return res.status(200).json({ movie: foundMovie })
}

// UPDATE MOVIE BY ID
const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const { title, runtimeMins } = req.body
    
    const foundMovie = await getMovieByIdDb(id)
    if (!foundMovie) return res.status(404).json({ error: "Movie does not exist"})

    if (!title || !runtimeMins)
    return res.status(400).json({ error: "Missing fields in the request body, please enter the film title and runtime in minutes."})

    const titleExists = await getMovieByTitleDb(title)
    if (titleExists) return res.status(409).json({ error: "A movie with that title already exists!"})

    const updatedMovie = await updateMovieDb(id, title, runtimeMins)
    return res.status(201).json({ movie: updatedMovie })
}

module.exports = { getMovieList, createMovie, getMovieById, updateMovie }