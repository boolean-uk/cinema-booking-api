const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getAllMoviesdb,
  createdMoviedb,
  getMoviedb,
  updatedMoviedb
} = require("../domains/movies");

const getAllMovies = async(req, res) => {
    try {
        const allMovies = await getAllMoviesdb();

        res.status(200).json({ movies: allMovies });
    } catch (err) {
      console.log("Error:", err);
    }
}

const createMovie = async(req, res) => {
    try {
        const {title, runtimeMins} = req.body;
        const createdMovie = await createdMoviedb(title, runtimeMins);

        res.status(201).json({ movie: createdMovie });
    } catch (err) {
      console.log("Error:", err);
    }
}

const getMovieByID = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, runtimeMins } = req.body;

        const movie = await getMoviedb(id);
        res.status(200).json({ movie: movie });
    } catch (err) {
      console.log("Error:", err);
    }
}

const updateMovie = async(req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, runtimeMins } = req.body;

    const updatedMovie = await updatedMoviedb(id, title, runtimeMins);

    res.status(201).json({ movie: updatedMovie });
  } catch (err) {
    console.log("Error:", err);
  }
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieByID,
  updateMovie
};