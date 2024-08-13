const prisma = require("../utils/prisma");

const getAllMoviesdb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

const createdMoviedb = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

const getMoviedb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

  const updatedMoviedb = async (id, title, runtimeMins) =>
    await prisma.movie.update({
      data: {
        title,
        runtimeMins,
      },
      where: {
        id,
      },
      include: {
        screenings: true,
      },
    });

module.exports = {
  getAllMoviesdb,
  createdMoviedb,
  getMoviedb,
  updatedMoviedb,
};
