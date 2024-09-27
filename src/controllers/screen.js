const { createScreenDb } = require("../domains/screen");

const createAnotherScreen = async (req, res) => {
  const { number } = req.body;
  try {
const createdScreen = await createScreenDb ( number )
res.status(201).json({
    screen: createdScreen, 
})
  } catch (error) {
    throw error
  }
};

module.exports = { createAnotherScreen  };
