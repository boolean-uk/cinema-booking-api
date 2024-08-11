const {
  createMovieDb,
  getAllMoviesDb,
  findMovieByIdDb,
  updateMovieByIdDb,
} = require("../domains/movies.js");
const { NotFoundError } = require("@prisma/client");

const getAllMovies = async (req, res) => {
  try {
    const { runtimeLt, runtimeGt } = req.query;
    const movies = await getAllMoviesDb(Number(runtimeLt), Number(runtimeGt));
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, runtimeMins } = req.body;
    if (!title || !runtimeMins) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }
    const createdMovie = await createMovieDb(title, runtimeMins);
    res.status(201).json({ movie: createdMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const searchedMovie = await findMovieByIdDb(id);
    if (!searchedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ movie: searchedMovie });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, runtimeMins } = req.body;
    if (!title || !runtimeMins) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }
    const updatedMovie = await updateMovieByIdDb(
      Number(id),
      title,
      runtimeMins
    );
    res.status(201).json({ movie: updatedMovie });
  } catch (error) {
    if (error.code === "P2015") {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getAllMovies, createMovie, findMovieById, updateMovieById };
