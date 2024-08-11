const prisma = require("../utils/prisma");

const createScreenDb = async (number, screenings) => {
  const data = {
    number,
  };

  if (screenings) {
    data.screenings = {
      createMany: {
        data: screenings,
      },
    };
  }

  try {
    const createdScreen = await prisma.screen.create({
      data,
      include: {
        screenings: true,
      },
    });

    return createdScreen;
  } catch (error) {
    throw new Error(`Failed to create screen: ${error.message}`);
  }
};

module.exports = { createScreenDb };
