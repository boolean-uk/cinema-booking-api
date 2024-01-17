// DB
const { getAllMoviesDb, createMovieDb } = require('../domains/movies')

// Error handlers
const { fieldsErrorHandler } = require('../helpers/errorsHandler')

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await getAllMoviesDb()

    res.status(200).json({ movies: movies })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: e.message })
  }
}

const createMovie = async (req, res, next) => {
  const { title, runtimeMins } = req.body

  try {
    fieldsErrorHandler([title, runtimeMins])

    const createdMovie = await createMovieDb(title, runtimeMins)

    res.status(201).json({ movie: createdMovie })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  getAllMovies,
  createMovie
}
