const router = require("express").Router();
const {
  getAllMovies,
  createMovie,
  getMovieByID,
  updateMovie
} = require("../controllers/movies");

//Get all movies
router.get("/", getAllMovies);

//Create a movie
router.post("/", createMovie);

//Get movie by ID:
router.get("/:id", getMovieByID);

//Update movie by ID:
router.put("/:id", updateMovie)


module.exports = router;