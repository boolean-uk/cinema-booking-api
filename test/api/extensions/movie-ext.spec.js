const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Movies Endpoint", () => {
  describe("GET /movies", () => {
    it("will retrieve a list of movies when runtime queries passed", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response1 = await supertest(app)
        .get("/movies")
        .query({ runtimeGt: 115 });
      expect(response1.status).toEqual(200);
      expect(response1.body.movies).not.toEqual(undefined);
      expect(response1.body.movies.length).toEqual(1);

      const response2 = await supertest(app)
        .get("/movies")
        .query({ runtimeLt: 115 });
      expect(response2.status).toEqual(200);
      expect(response2.body.movies).not.toEqual(undefined);
      expect(response2.body.movies.length).toEqual(1);

      const [movie1] = response1.body.movies;
      expect(movie1.title).toEqual("Dodgeball");
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);

      const [movie2] = response2.body.movies;
      expect(movie2.title).toEqual("Scream");
      expect(movie2.runtimeMins).toEqual(113);
      expect(movie2.screenings).not.toEqual(undefined);
      expect(movie2.screenings.length).toEqual(1);
    });
  });

  describe("POST /movies", () => {
    it("will return 400 when missing fields in request body", async () => {
      const request = {};

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when movie with provided title already exists", async () => {
      const request = {
        title: "Top Gun",
        runtimeMins: 110,
      };

      const screen = await createScreen(1);
      await createMovie(request.title, request.runtimeMins, screen);

      const response = (await supertest(app).post("/movies")).body(request);
      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /movies/:id", () => {
    it("will return 404 if movie not found", async () => {
      const response = await supertest(app).get(`/movies/-1`);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });
});
