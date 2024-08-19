const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createdScreendb } = require("../domains/screens");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdScreen = await createdScreendb(number, screenings);

    res.status(201).json({ screen: createdScreen });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: "A screen with the provided number already exists",
        });
      }
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createScreen,
};
