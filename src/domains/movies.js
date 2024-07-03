const prisma = require("../utils/prisma");

async function getMoviesDb() {
  let now = new Date();
  
    const movies = await prisma.movie.findMany({
      where: {
        screenings: {
          some: {
            startsAt: {
              gt: now,
            },
          },
        },
      },
      include: {
        screenings: true
      }
    });
    return movies;
}

async function createMovieDb(newMovie) {
  const movie = await prisma.movie.create({
    data: newMovie,
    include: {
      screenings: true,
    },
  });
  return movie;
}

async function getMovieByIdDb(movieId) {
  const movie = await prisma.movie.findUniqueOrThrow({
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });
  return movie;
}

async function updateMovieByIdDb(movieId, updatedProps) {
  const movie = await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: updatedProps,
    include: {
      screenings: true,
    },
  });
  return movie;
}

async function getMoviesWithQueryDb(query) {
  const { runtimeLt, runtimeGt } = query;

  const runTimeLimits = {
    ...(runtimeLt && { lt: Number(runtimeLt) }),
    ...(runtimeGt && { gt: Number(runtimeGt) }),
  };

  const movies = await prisma.movie.findMany({
    where: {
      runtimeMins: runTimeLimits,
    },
  });
  return movies;
}

module.exports = {
  getMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieByIdDb,
  getMoviesWithQueryDb,
};
