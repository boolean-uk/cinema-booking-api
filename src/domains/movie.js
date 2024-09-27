const prisma = require('../utils/prisma');

const getMoviesDb = async () => {
    try {
        return await prisma.movie.findMany({
            include: {
                screenings: true, 
            },
        });
    } catch (error) {
        throw error; 
    }
};

const getMoviesByIdDb = async (id) => { 
    try {
        return await prisma.movie.findUnique({
            where: {
                id: id, 
            },
            include: {
                screenings: true,
            },
        });
    } catch (error) {
        throw error;
    }
};

const createMovieDb = async (title, runtimeMins) => { 
    try {
        return await prisma.movie.create({
            data: {
                title,
                runtimeMins
            },
            include: {
                screenings: true
            }
        });
    } catch (error) {
        throw error;
    }
};

const updateMovieDb = async (id, title, runtimeMins) => { 
    try {
      return await prisma.movie.update({
        where: {
          id: id, 
        },
        data: {
          title: title,
          runtimeMins: runtimeMins,
        },
        include: {
          screenings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  };

module.exports = { getMoviesDb, getMoviesByIdDb, createMovieDb, updateMovieDb };
