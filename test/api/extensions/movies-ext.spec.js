const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");

describe("Movies Endpoint", () => {
  describe("GET /movies?runtimeLt", () => {
    it("will retrieve a list of movies with runtime less than runtimeLt", async () => {
      await createMovie("Movie 1", 130);
      await createMovie("Movie 2", 113);
      await createMovie("Movie 3", 84);

      const response = await supertest(app).get("/movies?runtimeLt=115");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie2, movie3] = response.body.movies;
      expect(movie2.title).toEqual("Movie 2");
      expect(movie2.runtimeMins).toEqual(113);

      expect(movie3.title).toEqual("Movie 3");
      expect(movie3.runtimeMins).toEqual(84);
    });
  });

  describe("GET /movies?runtimeGt", () => {
    it("will retrieve a list of movies with runtime more than runtimeGt", async () => {
      await createMovie("Movie 1", 130);
      await createMovie("Movie 2", 113);
      await createMovie("Movie 3", 84);

      const response = await supertest(app).get("/movies?runtimeGt=90");

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Movie 1");
      expect(movie1.runtimeMins).toEqual(130);

      expect(movie2.title).toEqual("Movie 2");
      expect(movie2.runtimeMins).toEqual(113);
    });
  });

  describe("GET /movies?runtimeLt&runtimeGt", () => {
    it("will retrieve a list of movies with a runtime between runtimeLt and runtimeGt", async () => {
      await createMovie("Movie 1", 130);
      await createMovie("Movie 2", 113);
      await createMovie("Movie 3", 84);

      const response = await supertest(app).get(
        "/movies?runtimeLt=160&runtimeGt=90"
      );

      expect(response.status).toEqual(200);
      expect(response.body.movies).not.toEqual(undefined);
      expect(response.body.movies.length).toEqual(2);

      const [movie1, movie2] = response.body.movies;
      expect(movie1.title).toEqual("Movie 1");
      expect(movie1.runtimeMins).toEqual(130);

      expect(movie2.title).toEqual("Movie 2");
      expect(movie2.runtimeMins).toEqual(113);
    });
  });

  describe("POST /movies", () => {
    it("will add screenings if screenings exist in the body", async () => {
      const screen1 = await createScreen(1);
      const screen2 = await createScreen(2);

      const request = {
        title: "Top Gun",
        runtimeMins: 110,
        screenings: [
          { screenId: screen1.id, startsAt: "2024-08-11T15:30:00.000Z" },
          { screenId: screen2.id, startsAt: "2024-08-17T18:30:00.000Z" },
        ],
      };

      const response = await supertest(app).post("/movies").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual("Top Gun");
      expect(response.body.movie.runtimeMins).toEqual(110);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
    });

    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {};

      const response = await supertest(app).post(`/movies`).send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when a movie with hte provided title already exists", async () => {
      const movie1 = await createMovie("Movie 1", 130);

      const request = {
        title: "Movie 1",
        runtimeMins: 130,
      };

      const response = await supertest(app).post(`/movies`).send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /movies/title", () => {
    it("will get movies by title", async () => {
      const screen = await createScreen(1);
      const movie = await createMovie("Dodgeball", 120, screen);

      const response = await supertest(app).get(`/movies/${movie.title}`);

      expect(response.status).toEqual(200);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual("Dodgeball");
      expect(response.body.movie.runtimeMins).toEqual(120);
      expect(response.body.movie.screenings).not.toEqual(undefined);
    });

    it("will return 404 if the movie or title is not found", async () => {
      const response = await supertest(app).get(`/movies/10000`);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /movies/:id", () => {
    it("will update a movie by id and screening if provided", async () => {
      const screen1 = await createScreen(1);
      const screen2 = await createScreen(2);
      const movie = await createMovie("Dodgeball", 120, screen1);

      const request = {
        title: "Scream",
        runtimeMins: 113,
        screenings: [
          { screenId: screen1.id, startsAt: "2024-08-11T15:30:00.000Z" },
          { screenId: screen2.id, startsAt: "2024-08-17T18:30:00.000Z" },
        ],
      };

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.movie).not.toEqual(undefined);
      expect(response.body.movie.title).toEqual("Scream");
      expect(response.body.movie.runtimeMins).toEqual(113);
      expect(response.body.movie.screenings).not.toEqual(undefined);
      expect(response.body.movie.screenings.length).toEqual(2);
    });

    it("will return 404 if the movie with that id is not found", async () => {
      const request = {
        title: "Updated name",
        runtimeMins: 120,
      };

      const response = await supertest(app).put(`/movies/10000`).send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 400 when there are missing fields in the request body", async () => {
      const movie = await createMovie("Dodgeball", 120);
      const request = {};

      const response = await supertest(app)
        .put(`/movies/${movie.id}`)
        .send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when a movie with the provided title already exists", async () => {
      const screen1 = await createScreen(1);
      const movie1 = await createMovie("Movie 1", 130, screen1);

      const request = {
        title: movie1.title,
        runtimeMins: movie1.runtimeMins,
      };

      const response = await supertest(app)
        .put(`/movies/${movie1.id}`)
        .send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });
});
