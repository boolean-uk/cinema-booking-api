const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { movie } = require("../../../src/utils/prisma.js");

describe("Movie Endpoint", () => {
  describe("GET /movies", () => {
    it("will retrieve a list of movies with runtime less than 115", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const queryData = {
        runtimeLt: 115,
      };

      const response = await supertest(app).get("/movies").query(queryData);

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1] = response.body.movies;
      expect(movie1.title).toEqual("Scream");
      expect(movie1.runtimeMins).toEqual(113);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);
    });
  });

  describe("GET /movies", () => {
    it("will retrieve a list of movies with runtime more than 115", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const queryData = {
        runtimeGt: 115,
      };

      const response = await supertest(app).get("/movies").query(queryData);

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(1);

      const [movie1] = response.body.movies;
      expect(movie1.title).toEqual("Dodgeball");
      expect(movie1.runtimeMins).toEqual(120);
      expect(movie1.screenings).not.toEqual(undefined);
      expect(movie1.screenings.length).toEqual(1);
    });
  });

  describe("POST /movies", () => {
    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {};

      const response = await supertest(app).post(`/movies/`).send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when a movie with the provided title already exists", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      const request = {
        title: "Dodgeball",
        runtimeMins: 200,
      };

      const response = await supertest(app).post(`/movies/`).send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });
  describe("GET /movies/:id", () => {
    it("will return 404 when movie with that id", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response = await supertest(app).get(`/movies/4`);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
    it("will return 404 when movie with that title does not exist", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const response = await supertest(app).get(`/movies/Screeeen`);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });
  describe("PUT /movies/:id", () => {
    it("will return 400 when there are missing fields in the request body", async () => {
      const screen = await createScreen(1);
      await createMovie("Dodgeball", 120, screen);
      await createMovie("Scream", 113, screen);

      const request = {};

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
    it("will return 404 when movie with that id does not exist", async () => {
      const request = {
        title: "Movie Updated",
        runtimeMins: 90,
      };

      const response = await supertest(app).put(`/movies/4500`).send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  
    // it("will return 409 when movie with that title already exists", async () => {
    //   const screen = await createScreen(1);
    //   await createMovie("Dodgeball", 120, screen);
    //   await createMovie("Scream", 113, screen);

    //   const request = {
    //     title: "Scream",
    //     runtimeMins: 113,
    //   };

    //   const response = await supertest(app)
    //     .put(`/movies/1`)
    //     .send(request);

    //   expect(response.status).toEqual(409);
    //   expect(response.body).toHaveProperty("error");
    // });
  });
});
