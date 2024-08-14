const prisma = require("../utils/prisma");

const getAllMoviesdb = async (runtimeLt, runtimeGt) =>
  await prisma.movie.findMany({
    where: {
      //This means IF runtimeLt/runtimeGt has been added then apply the where clause, otherwise doe nothing. Adding this enables all movies to still be returned even if no runtimeLt/runtimeGt has been searched.
      ...(runtimeLt || runtimeGt
        ? {
            // Using 'or' statment which means one or more conditions must return true. In this case either runtimeLt OR runtimeGt must be true/added.
            OR: [
              {
                //This statement means that if runtimeLt query has been added then return all movies with a runtime less than (lt) runtimeLt. If NO runtimeLt has been searched, do nothing. This means code will not break if no runtimeLt is added. Gives the user options.
                ...(runtimeLt
                  ? {
                      runtimeMins: {
                        lt: runtimeLt,
                      },
                    }
                  : {}),
              },
              {
                ...(runtimeGt
                  ? {
                      runtimeMins: {
                        gt: runtimeGt,
                      },
                    }
                  : {}),
              },
            ],
          }
        : {}),
    },
    include: {
      screenings: true,
    },
  });

const createdMoviedb = async (title, runtimeMins, screenings) => {
  const movieData = {
    title,
    runtimeMins,
  };

  if (screenings) {
    movieData.screenings = {
      createMany: {
        data: screenings,
      },
    };
  }

  return await prisma.movie.create({
    data: movieData,
    include: {
      screenings: true,
    },
  });
};

const getMoviedb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

const updatedMoviedb = async (id, title, runtimeMins, screenings) => {
  const movieData = {
    title,
    runtimeMins,
  };

  if (screenings) {
    movieData.screenings = {
      deleteMany: {},
      createMany:  {
        data: screenings,
      }
    };

    console.log("data", screenings);
  }
  return await prisma.movie.update({
    data: movieData,
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });
};

module.exports = {
  getAllMoviesdb,
  createdMoviedb,
  getMoviedb,
  updatedMoviedb,
};
