const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const Movies = await prisma.movie.findMany();
  res.status(200).json({ movies: Movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });
  res.status(201).json({ movie: createdMovie });
};

module.exports = { getMovies, createMovie };
