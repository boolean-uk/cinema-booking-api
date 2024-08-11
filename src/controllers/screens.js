const { createScreenDb } = require("../domains/screens.js");
const { PrismaClientKnownRequestError } = require("@prisma/client");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  try {
    if (!number) {
      return res
        .status(400)
        .json({ error: "Missing number field in request body" });
    }

    const screenNumber = Number(number);

    const createdScreen = await createScreenDb(screenNumber, screenings);

    res.status(201).json({ screen: createdScreen });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the provided number already exists" });
      }
    }

    console.error("Error creating screen:", error);
    res.status(500).json({ error: "Failed to create screen" });
  }
};

module.exports = { createScreen };
