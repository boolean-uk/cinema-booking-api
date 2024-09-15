const express = require("express");
const router = express.Router();

const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie
} = require('../controllers/movies');

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);

module.exports = router;
