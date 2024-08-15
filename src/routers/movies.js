const express = require("express");
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.get("/:identifier", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);

module.exports = router;
