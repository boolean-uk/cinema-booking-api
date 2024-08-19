const prisma = require("../utils/prisma");

const getAllMoviesdb = async (runtimeLt, runtimeGt) => {
  const runTimeClauses = {
    ...(runtimeLt
      ? {
          lt: runtimeLt,
        }
      : {}),

    ...(runtimeGt
      ? {
          gt: runtimeGt,
        }
      : {}),
  };

  console.log("run time clauses", runTimeClauses);
  const currentDate = new Date();

  if (runtimeGt || runtimeLt) {
    return await prisma.movie.findMany({
      where: {
        runtimeMins: runTimeClauses,
      },
      include: {
        screenings: true,
      },
    });
  } else {
    return await prisma.movie.findMany({
      // where: {
      //   screenings: {
      //     some: {
      //     startsAt: {
      //       gt: currentDate
      //     }
      //   }
      // }
      // },
      include: {
        screenings: true,
      },
    });
  }
};

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

const getMoviedb = async (id) => {
  //NaN means if not a number. !Nan means if a number.
  if (!isNaN(id)) {
    return await prisma.movie.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
      include: {
        screenings: true,
      },
    });
  } else {
    return await prisma.movie.findUniqueOrThrow({
      where: {
        title: id,
      },
      include: {
        screenings: true,
      },
    });
  }
};

const updatedMoviedb = async (id, title, runtimeMins, screenings) => {
  const movieData = {
    title,
    runtimeMins,
  };

  if (screenings) {
    movieData.screenings = {
      deleteMany: {},
      createMany: {
        data: screenings,
      },
    };
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
