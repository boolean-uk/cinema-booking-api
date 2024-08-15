const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getAllMoviesdb,
  createdMoviedb,
  getMoviedb,
  updatedMoviedb,
} = require("../domains/movies");

const getAllMovies = async (req, res) => {
  try {
    const runtimeLt = Number(req.query.runtimeLt);
    const runtimeGt = Number(req.query.runtimeGt);

    const allMovies = await getAllMoviesdb(runtimeLt, runtimeGt);

    res.status(200).json({ movies: allMovies });
  } catch (err) {
    console.log("Error:", err);
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdMovie = await createdMoviedb(title, runtimeMins, screenings);

    res.status(201).json({ movie: createdMovie });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: "A movie with the provided title already exists",
        });
      }
    }
    res.status(500).json({ error: err.message });
  }
};

const getMovieByID = async (req, res) => {
  try {
    const id = Number(req.params.id);
  
    const movie = await getMoviedb(id);
    res.status(200).json({ movie: movie });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({
          error: "A movie with that id does not exist",
        });
      }
    }
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const updatedMovie = await updatedMoviedb(
      id,
      title,
      runtimeMins,
      screenings
    );

    res.status(201).json({ movie: updatedMovie });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({
          error: "A movie with that id does not exist",
        });
      }
    }

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: "A movie with the provided title already exists",
        });
      }
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieByID,
  updateMovie,
};
