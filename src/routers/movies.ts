import express from 'express'
import * as moviesController from '../controllers/movies'

const router = express.Router()

router.get('/', moviesController.getAllMovies)
router.get('/:id', moviesController.getMovieById)
router.post('/', moviesController.createMovie)
router.put('/:id', moviesController.updateMovie)

export default router
