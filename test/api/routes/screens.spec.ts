// const supertest = require('supertest')
// const app = require('../../../src/server.js')

import supertest from 'supertest'
import app from '../../../src/server'

describe('Screens Endpoint', () => {
    describe('POST /screens', () => {
        it('will create a new screen', async () => {
            const request = {
                number: 10,
            }

            const response = await supertest(app).post('/screens').send(request)

            expect(response.status).toEqual(201)
            expect(response.body.screen).not.toEqual(undefined)
            expect(response.body.screen.number).toEqual(10)
        })
    })
})
