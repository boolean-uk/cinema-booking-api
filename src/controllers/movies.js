const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getMoviesDb,
  getMovieByIdDb,
  getMovieByTitleDb,
  createMovieDb,
  updateMovieDb,
} = require("../domains/movies.js");

const getMovies = async (req, res) => {
  const { lessThan, greaterThan } = req.query;

  let query = {};

  if (lessThan) {
    query.runtimeMins = {
      ...query.runtimeMins,
      lte: parseInt(lessThan, 10),
    };
  }

  if (greaterThan) {
    query.runtimeMins = {
      ...query.runtimeMins,
      gte: parseInt(greaterThan, 10),
    };
  }

  try {
    const movies = await getMoviesDb(query);
    res.status(200).json({ movies: movies });
  } catch (err) {
    console.log("Error:", err);
  }
};

const getMovieById = async (req, res) => {
  const request = req.params.identifier;

  try {
    if (!isNaN(request)) {
      const reqId = +request;
      const movie = await getMovieByIdDb(request);
      res.status(200).json({ movie: movie });
    } else if (isNaN(request)) {
      const movie = await getMovieByTitleDb(request);
      res.status(200).json({ movie: movie });
    } else {
      return res.status(400).json({
        error: "Invalid request",
      });
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  console.log(screenings);

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdMovie = await createMovieDb(title, runtimeMins, screenings);

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const reqId = +req.params.id;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const updatedMovie = await updateMovieDb(reqId, title, runtimeMins);

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "" });
      }
    }
    console.log(typeof req.body.runtimeMins);

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
