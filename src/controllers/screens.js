const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createdScreendb } = require("../domains/screens");

const createScreen = async (req, res) => {
  try {
    const { number } = req.body;
    const createdScreen = await createdScreendb(number);

    res.status(201).json({ screen: createdScreen });
  } catch (err) {
    console.log("Error:", err);
  }
};

module.exports = {
  createScreen,
};
