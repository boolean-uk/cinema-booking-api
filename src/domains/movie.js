const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings:true
      }
    })
    return movies
  } catch (error) {
    throw new Error('Failed to fetch movies from database.')
  }
}

const createdMovieDb = async (title, runtimeMins) => {
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins
      },
      include : {
        screenings : true
      }
    })
    return newMovie
  } catch (error) {
    throw new Error('Failed to create a new movie.')
  }
}

const getMovieDb = async (id) => {
  try {
    const movieFound = await prisma.movie.findFirst({
      include : {
        screenings : true
      }
    })
    return movieFound
  } catch (error) {
    throw new Error ('Failed to fetch movie from database.')
  }
}

const updateMovieDb = async (id, title, runtimeMins) => {
  
  try {
    const updatedMovie = await prisma.movie.update({
      where: { id : id },
      data : {
        title,
        runtimeMins
      },
      include : {
        screenings : true
      }
    })
    return updatedMovie
  } catch (error) {
    throw new Error ('Failed to update movie at DB!')
  }
}

module.exports = {
  getAllMoviesDb,
  createdMovieDb,
  getMovieDb,
  updateMovieDb
}