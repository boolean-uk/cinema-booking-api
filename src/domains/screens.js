const prisma = require("../utils/prisma");


const createdScreendb = async (number) =>
  await prisma.screen.create({
    data: {
      number,
    }
  });


  module.exports = {
    createdScreendb
  };
