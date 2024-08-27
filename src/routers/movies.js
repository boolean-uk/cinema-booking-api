const express = require("express");
const prisma = require("../utils/prisma.js");
const { response } = require("../server.js");

const router = express.Router();

// GET REQUESTS

router.get("/", async (req, res) => {
  // GET ALL THE MOVIES AND THEIR SCREENINGS
  const response = [];

  const movies = await prisma.movie.findMany(); // GET ALL MOVIES

  for (const movie of movies) {
    const screening = await prisma.screening.findMany({
      // GET SCREENINGS FOR CURRENT MOVIE
      where: { movieId: movie.id },
    });

    movie.screenings = screening; // ADD SCREENINGS FIELD INTO THE CURRENT MOVIE OBJECT

    response.push(movie); // ADD MOVIE INTO THE RESPONSE ARRAY
  }
  res.json({ movies: response });
});

router.get("/:id", async (req, res) => {});

// POST REQUESTS

router.post("/", async (req, res) => {
  const movie = await prisma.movie.create({
    // CREATES A NEW MOVIE WITH THE GIVEN TITLE AND RUNTIME IN THE REQUEST BODY
    data: {
      title: req.body.title,
      runtimeMins: req.body.runtimeMins,
    },
  });

  const screening = await prisma.screening.findMany({
    //FINDS SCREENINGS IF THE CREATED MOVIE HAS ANY
    where: { movieId: movie.id },
  });

  movie.screenings = screening; // ADD SCREENINGS FIELD INTO THE CURRENT MOVIE OBJECT

  res.status(201).json({ movie: movie });
});

module.exports = router;
