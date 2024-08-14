const prisma = require("../utils/prisma");

const createdScreendb = async (number, screenings) => {
  const screenData = {
    number,
  };

  if (screenings) {
    screenData.screenings = {
      createMany: {
        data: screenings,
      },
    };
  }

  return await prisma.screen.create({
    data: screenData,
    include: {
      screenings: true
    }
  });
};


  module.exports = {
    createdScreendb
  };
