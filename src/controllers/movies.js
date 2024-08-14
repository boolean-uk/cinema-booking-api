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
  
  if (!title || !runtimeMins ) {
      return res.status(400).json({
        error: "Missing fields in request body",
      });
    }

  try {
    const createdMovie = await createdMoviedb(title, runtimeMins, screenings);

    res.status(201).json({ movie: createdMovie });
  } catch (err) {
    console.log("Error:", err);
  }
};

const getMovieByID = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, runtimeMins } = req.body;

    const movie = await getMoviedb(id);
    res.status(200).json({ movie: movie });
  } catch (err) {
    console.log("Error:", err);
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, runtimeMins, screenings } = req.body;

    const updatedMovie = await updatedMoviedb(
      id,
      title,
      runtimeMins,
      screenings
    );

    res.status(201).json({ movie: updatedMovie });
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieByID,
  updateMovie,
};
