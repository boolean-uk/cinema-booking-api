// const supertest = require('supertest')
// const app = require('../../../src/server.js')
// const { createScreen } = require('../../helpers/createScreen.js')
// const { createMovie } = require('../../helpers/createMovie.js')

import supertest from 'supertest'
import app from '../../../src/server'
import createScreen from '../../helpers/createScreen'
import createMovie from '../../helpers/createMovie'

describe('Movies Endpoint', () => {
    describe('GET /movies', () => {
        it('will retrieve a list of movies', async () => {
            const screen = await createScreen(1)
            await createMovie('Dodgeball', 120, screen)
            await createMovie('Scream', 113, screen)

            const response = await supertest(app).get('/movies')

            expect(response.status).toEqual(200)
            expect(response.body.movies).not.toEqual(undefined)
            expect(response.body.movies.length).toEqual(2)

            const [movie1, movie2] = response.body.movies
            expect(movie1.title).toEqual('Dodgeball')
            expect(movie1.runtimeMins).toEqual(120)
            expect(movie1.screenings).not.toEqual(undefined)
            expect(movie1.screenings.length).toEqual(1)

            expect(movie2.title).toEqual('Scream')
            expect(movie2.runtimeMins).toEqual(113)
            expect(movie2.screenings).not.toEqual(undefined)
            expect(movie2.screenings.length).toEqual(1)
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
    })
})
