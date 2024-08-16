const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screens.js");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdScreen = await createScreenDb(number, screenings);

    res.status(201).json({ screen: createdScreen });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the provided number already exists." });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};
