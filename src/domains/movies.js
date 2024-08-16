const prisma = require("../utils/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client");

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

const updateMovieDb = async (reqId, title, runtimeMins, screenings) => {
  try {
    const movie = await prisma.movie.update({
      where: {
        id: reqId,
      },
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
      include: { screenings: true },
    });
    return movie;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }
    throw error;
  }
};

module.exports = {
  getMoviesDb,
  getMovieByIdDb,
  getMovieByTitleDb,
  createMovieDb,
  updateMovieDb,
};
