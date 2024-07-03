const supertest = require("supertest")
const app = require("../../../src/server.js")
const { createMovie } = require("../../helpers/createMovie")
const { createScreen } = require("../../helpers/createScreen")

describe("Movie Endpoint", () => {
    describe("GET /movies?runtimeLt", () => {
        it("will return movies with a runtime less than runtimeLt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 135)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeLt=140')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test1')
            expect(movie1.runtimeMins).toEqual(130)

            expect(movie2.title).toEqual('test2')
            expect(movie2.runtimeMins).toEqual(135)
        })
    })

    describe("GET /movies?runtimeGt", () => {
        it("will return movies with a runtime more than runtimeGt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 135)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeGt=134')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test2')
            expect(movie1.runtimeMins).toEqual(135)

            expect(movie2.title).toEqual('test3')
            expect(movie2.runtimeMins).toEqual(150)
        })
    })

    describe("GET /movies?runtimeLt&runtimeGt", () => {
        it("will return movies with a runtime less than runtimeLt and more than runtimeGt", async () => {
            await createMovie("test1", 130)
            await createMovie("test2", 140)
            await createMovie('test3', 150)

            const response = await supertest(app)
            .get('/movies?runtimeLt=135&runtimeGt=145')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('test1')
            expect(movie1.runtimeMins).toEqual(130)

            expect(movie2.title).toEqual('test3')
            expect(movie2.runtimeMins).toEqual(150)
        })
    })

    describe("POST /movies", () => {
        it("will add a screening if the property exists in the body", async () => {
            const screen1 = await createScreen(1)
            const screen2 = await createScreen(2)

            const request = {
                title: "Minions",
                runtimeMins: 120,
                screenings: [
                    {
                        movieId: 1,
                        screenId: screen1.id,
                        startsAt: "2022-06-11T18:30:00.000Z"
                    },
                    {
                        movieId: 1,
                        screenId: screen2.id,
                        startsAt: "2023-06-11T18:30:00.000Z"
                    }
                ]
            }

            const response = await supertest(app)
                .post('/movies')
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Minions')
            expect(response.body.movie.runtimeMins).toEqual(120)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(2)
        })

        it("will return 400 when there are missing fields in the request body", async () => {
            const request = {}

            const response = await supertest(app)
                .post('/movies')
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })

        it("will return 409 when a movie with the provided title already exists", async () => {
            const screen = await createScreen(1)
            const movie = await createMovie("test1", 130, screen)

            const request = {
                title: movie.title,
                runtimeMins: movie.runtimeMins
            }

            const response = await supertest(app)
                .post('/movies')
                .send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })

    describe("GET /movies/title", () => {
        it("will get movies by title", async () => {
            const screen = await createScreen(1)
            const movie = await createMovie('Dodgeball', 120, screen)

            const response = await supertest(app).get(`/movies/${movie.title}`)

            expect(response.status).toEqual(200)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Dodgeball')
            expect(response.body.movie.runtimeMins).toEqual(120)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(1)
        })

        it('will return 404 if the movie is not found by id', async () => {
            const response = await supertest(app)
                .get('/movies/10000')

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })

        it('will return 404 if the movie is not found by title', async () => {
            const response = await supertest(app)
                .get('/movies/bkdscjcd')

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })
    })

    describe("PUT /movies/:id", () => {
        it("will update a movie by id and the screenings when provided", async () => {
            const screen1 = await createScreen(1)
            const screen2 = await createScreen(2)
            const created = await createMovie('Dodgeball', 120, screen1)

            const request = {
                title: 'Scream',
                runtimeMins: 113,
                screenings: [
                    {
                        screenId: screen1.id,
                        startsAt: "2022-06-11T18:30:00.000Z"
                    },
                    {
                        screenId: screen2.id,
                        startsAt: "2023-06-11T18:30:00.000Z"
                    }
                ]
            }

            const response = await supertest(app)
                .put(`/movies/${created.id}`)
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Scream')
            expect(response.body.movie.runtimeMins).toEqual(113)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(2)
        })

        it("will return 400 when there are missing fields in the request body", async () => {
            const screen = await createScreen(1)
            const movie = await createMovie('Dodgeball', 120, screen)

            const request = {}

            const response = await supertest(app)
                .put(`/movies/${movie.id}`)
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
    })
})
