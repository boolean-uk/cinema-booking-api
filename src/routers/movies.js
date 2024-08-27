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

router.get("/:id", async (req, res) => {
  try {
    // TRY TO RUN THE ASYNC AWAIT FUNCTION
    const [movie] = await prisma.movie.findMany({
      // GET MOVIE WITH GIVEN ID
      where: {
        id: Number(req.params.id),
      },
    });

    // TRY TO GET THE SCREENINGS
    const screenings = await prisma.screening.findMany({
      // GET SCREENINGS FOR CURRENT MOVIE
      where: { movieId: movie.id },
    });

    movie.screenings = screenings; // ADD SCREENINGS FIELD INTO THE CURRENT MOVIE OBJECT
    // IF THERE ARE NO SCREENINGS IT WILL DISPLAY THE FOLLOWING MESSAGE

    res.json({ movie });
  } catch (error) {
    // IF THERE ARE NO MOVIES THE AWAIT WILL THROW AN ERROR. THIS WILL CATCH IT
    res.status(404).json({ error: "MOVIE NOT FOUND" });
  }
});

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

// PUT REQUESTS

router.put("/:id", async (req, res) => {
  try {
    // TRY TO RUN THE ASYNC AWAIT FUNCTION
    const movie = await prisma.movie.update({
      // UPDATE MOVIE WITH GIVEN ID
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins,
      },
    });

    res.status(201).json({ movie });
  } catch (error) {
    // IF THERE ARE NO MOVIES THE AWAIT WILL THROW AN ERROR. THIS WILL CATCH IT
    res.status(404).json({ error: "MOVIE NOT FOUND" });
  }
});

module.exports = router;
