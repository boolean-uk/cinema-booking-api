const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createdScreendb } = require("../domains/screens");

const createScreen = async (req, res) => {
  try {
    const { number, screenings } = req.body;
    const createdScreen = await createdScreendb(number, screenings);

    res.status(201).json({ screen: createdScreen });
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = {
  createScreen,
};
