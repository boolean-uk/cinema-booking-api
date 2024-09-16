const express = require("express")
const router = express.Router()

const { getMovieList, createMovie, getMovieById, updateMovie } = require('../controllers/movie.js')

// GET LIST OF MOVIES
router.get('/', getMovieList)

// CREATE A MOVIE
router.post('/', createMovie)

// GET MOVIE BY ID
router.get('/:id', getMovieById)

// UPDATE MOVIE BY ID
router.put('/:id', updateMovie)

module.exports = router