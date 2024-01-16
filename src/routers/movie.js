// routers/movie.js
const express = require("express");
const router = express.Router();
const { getMovies, getMoviesByID, createMovie, updateMovie } = require('../controllers/movie');

router.get("/", getMovies); // Changed from /movie to /
router.get("/:id", getMoviesByID);
router.post("/", createMovie);
router.put("/:id", updateMovie)

module.exports = router;
