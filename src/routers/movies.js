const express = require("express");
const prisma = require("../utils/prisma.js");
const { response } = require("../server.js");

const router = express.Router();

// GET REQUESTS

router.get("/", async (req, res) => {
  // GET ALL THE MOVIES AND THEIR SCREENINGS

  const response = await prisma.movie.findMany({
    include: { screenings: true },
  }); // GET ALL MOVIES

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
      include: { screenings: true },
    });

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
    include: { screenings: true },
  });

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
      include: { screenings: true },
    });

    res.status(201).json({ movie });
  } catch (error) {
    // IF THERE ARE NO MOVIES THE AWAIT WILL THROW AN ERROR. THIS WILL CATCH IT
    res.status(404).json({ error: "MOVIE NOT FOUND" });
  }
});

module.exports = router;
