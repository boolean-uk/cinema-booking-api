const prisma = require("../utils/prisma");

const getAllMoviesdb = async (runtimeLt, runtimeGt) =>
  await prisma.movie.findMany({
    where: {
      // Using 'or' statment which means one or more conditions must return true. In this case either runtimeLt OR runtimeGt must be true/added.
      OR: [
        {
          //This statement means that if runtimeLt query has been added then return all movies with a runtime less than (lt) runtimeLt. If NO runtimeLt has been searched, do nothing. Adding this enables all movies to still be returned even if no runtimeLt/runtimeGt has been searched.
          ...(runtimeLt
            ? {
                runtimeMins: {
                  lt: runtimeLt,
                },
              }
            : {}),
        },
        {
          //Again conditonal statement added here which will still allow for all movies to be returned even if runtimeGt has not been added.
          ...(runtimeGt
            ? {
                runtimeMins: {
                  gt: runtimeGt,
                },
              }
            : {}),
        },
      ],
    },
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
