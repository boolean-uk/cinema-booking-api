const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");

describe("Screens Endpoint", () => {
  describe("POST /screens", () => {
    it("will create a screen and screening if provided", async () => {
      const movie1 = await createMovie("Movie 1", 130);
      const movie2 = await createMovie("Movie 2", 113);

      const request = {
        number: 15,
        screenings: [
          { movieId: movie1.id, startsAt: "2024-08-11T15:30:00.000Z" },
          { movieId: movie2.id, startsAt: "2024-08-17T18:30:00.000Z" },
        ],
      };

      const response = await supertest(app).post("/screens").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.screen).not.toEqual(undefined);
      expect(response.body.screen.number).toEqual(15);
      expect(response.body.screen.screenings).not.toEqual(undefined);
      expect(response.body.screen.screenings.length).toEqual(2);
    });
  });
});
