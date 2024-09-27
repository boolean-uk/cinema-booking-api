const {
  getMoviesDb,
  getMoviesByIdDb,
  createMovieDb,
  updateMovieDb
} = require("../domains/movie");

// controllers/movie.js
const getMovies = async (req, res) => {
  try {
    const movies = await getMoviesDb();
    res.status(200).json({ movies: movies }); // Changed from { data: movies }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the movies" });
  }
};

const getMoviesByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await getMoviesByIdDb(id); // Corrected function name
    if (movie) {
      res.status(200).json({ movie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  try {
    const createdMovie = await createMovieDb(title, runtimeMins, screenings);
    res.status(201).json({
      movie: createdMovie,
    });
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    const id = parseInt(req.params.id); 
  
    try {
      const updatedMovie = await updateMovieDb(id, title, runtimeMins); 
      res.status(201).json({ movie: updatedMovie });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { getMovies, getMoviesByID, createMovie, updateMovie };
