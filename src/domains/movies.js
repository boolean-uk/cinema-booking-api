const prisma = require("../utils/prisma");

const getMoviesDb = async (query) =>
  await prisma.movie.findMany({
    where: query,
  });

const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

const getMovieByTitleDb = async (title) =>
  await prisma.movie.findFirst({
    where: {
      title: title,
    },
  });

const createMovieDb = async (title, runtimeMins, screenings) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: screenings
        ? {
            create: screenings.map((screening) => ({
              screenId: screening.screenId,
              startsAt: screening.startsAt,
            })),
          }
        : undefined,
    },
  });

const updateMovieDb = async (reqId, title, runtimeMins) =>
  await prisma.movie.update({
    where: {
      id: reqId,
    },
    data: {
      title,
      runtimeMins,
    },
  });

module.exports = {
  getMoviesDb,
  getMovieByIdDb,
  getMovieByTitleDb,
  createMovieDb,
  updateMovieDb,
};
