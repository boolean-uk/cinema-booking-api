const prisma = require("../utils/prisma");

const createScreenDb = async (number, screenings) =>
  await prisma.screen.create({
    data: {
      number,
      screenings: screenings
        ? {
            create: screenings.map((screening) => ({
              movieId: screening.movieId,
              startsAt: new Date(screening.startsAt),
            })),
          }
        : undefined,
    },
    include: { screenings: true },
  });

module.exports = {
  createScreenDb,
};
