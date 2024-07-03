const supertest = require('supertest')
const app = require('../../../src/server.js')
const { createMovie } = require('../../helpers/createMovie.js')
const { createScreen } = require('../../helpers/createScreen.js')
const { createScreening } = require('../../helpers/createScreening.js')

describe('Movies Endpoint', () => {
    describe('GET /movies', () => {
        it('will retrieve a list of movies, but not include any without screenings in the future', async () => {
            const screen = await createScreen(1)
            const movie = await createMovie('Dodgeball', 120)
            const secondMovie = await createMovie('Scream', 113)

            await createScreening(
                screen.id,
                movie.id,
                new Date(Date.now() + 86400).toISOString()
            )
            await createScreening(
                screen.id,
                secondMovie.id,
                new Date(Date.now() - 86400).toISOString()
            )

            const response = await supertest(app).get('/movies')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(1)

            const [movie1] = response.body.movies
            expect(movie1.title).toEqual('Dodgeball')
            expect(movie1.runtimeMins).toEqual(120)
            expect(movie1.screenings).not.toEqual(undefined)
            expect(movie1.screenings.length).toEqual(1)
        })
    })

    describe('POST /movies', () => {
        it('will create a movie', async () => {
            const request = {
                title: 'Top Gun',
                runtimeMins: 110,
            }

            const response = await supertest(app).post('/movies').send(request)

            expect(response.status).toEqual(201)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Top Gun')
            expect(response.body.movie.runtimeMins).toEqual(110)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(0)
        })

        it('will return 400 if fields are missing', async () => {
            const request = {
                title: 'Top Gun',
            }

            const response = await supertest(app).post('/movies').send(request)

            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual(
                'Missing fields in request body'
            )
        })
    })

    describe('GET /movies/:id', () => {
        it('will get a movie by id', async () => {
            const screen = await createScreen(1)
            const created = await createMovie('Dodgeball', 120, screen)

            const response = await supertest(app).get(`/movies/${created.id}`)

            expect(response.status).toEqual(200)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Dodgeball')
            expect(response.body.movie.runtimeMins).toEqual(120)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(1)
        })

        it('will return 404 if movie is not found', async () => {
            const response = await supertest(app).get(`/movies/9999`)

            expect(response.status).toEqual(404)
            expect(response.body.error).toContain('No Movie found')
        })
    })

    describe('PUT /movies/:id', () => {
        it('will update a movie by id', async () => {
            const screen = await createScreen(1)
            const created = await createMovie('Dodgeball', 120, screen)

            const request = {
                title: 'Scream',
                runtimeMins: 113,
            }

            const response = await supertest(app)
                .put(`/movies/${created.id}`)
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.movie).not.toEqual(undefined)
            expect(response.body.movie.title).toEqual('Scream')
            expect(response.body.movie.runtimeMins).toEqual(113)
            expect(response.body.movie.screenings).not.toEqual(undefined)
            expect(response.body.movie.screenings.length).toEqual(1)
        })

        it('will return 400 if fields are missing', async () => {
            const screen = await createScreen(1)
            const created = await createMovie('Dodgeball', 120, screen)

            const request = {
                title: 'Scream',
            }

            const response = await supertest(app)
                .put(`/movies/${created.id}`)
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual(
                'Missing fields in request body'
            )
        })

        it('will return 404 if movie is not found', async () => {
            const request = {
                title: 'Scream',
                runtimeMins: 113,
            }

            const response = await supertest(app)
                .put(`/movies/9999`)
                .send(request)

            expect(response.status).toEqual(404)
        })
    })
})
