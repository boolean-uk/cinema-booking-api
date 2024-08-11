const prisma = require("../utils/prisma");

const createMovieDb = async (title, runtimeMins, screenings) => {
  const data = {
    title,
    runtimeMins,
  };

  if (screenings) {
    data.screenings = {
      createMany: {
        data: screenings,
      },
    };
  }

  const createdMovie = await prisma.movie.create({
    data,
    include: {
      screenings: true,
    },
  });

  return createdMovie;
};

const getAllMoviesDb = async () => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: {},
    },
  });

  return movies;
};

const findMovieByIdDb = async (id) => {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    return findMovieByTitleDb(id);
  }

  const movie = await prisma.movie.findUniqueOrThrow({
    where: { id: parsedId },
    include: {
      screenings: true,
    },
  });

  return movie;
};

const findMovieByTitleDb = async (title) => {
  const movie = await prisma.movie.findUniqueOrThrow({
    where: { title },
    include: {
      screenings: true,
    },
  });

  return movie;
};

const updateMovieByIdDb = async (id, title, runtimeMins) => {
  const updatedMovie = await prisma.movie.update({
    where: { id },
    data: { title, runtimeMins },
    include: {
      screenings: true,
    },
  });

  return updatedMovie;
};

module.exports = {
  createMovieDb,
  getAllMoviesDb,
  findMovieByIdDb,
  updateMovieByIdDb,
};
