import supertest from 'supertest'
import app from '../../../src/server'
import createCustomer from '../../helpers/createCustomer'

describe('Customer Endpoint', () => {
    describe('PUT /customers/:id', () => {
        it('can update a customers contact info when a contact property exists on the request body', async () => {
            const customer = await createCustomer(
                'John',
                '123456',
                'john@test.com'
            )

            const request = {
                name: 'Jane',
                contact: {
                    phone: '789',
                    email: 'jane@test.com',
                },
            }

            const response = await supertest(app)
                .put(`/customers/${customer.id}`)
                .send(request)

            expect(response.status).toEqual(201)
            expect(response.body.customer).not.toEqual(undefined)
            expect(response.body.customer.name).toEqual(request.name)
            expect(response.body.customer.contact).not.toEqual(undefined)
            expect(response.body.customer.contact.phone).toEqual('789')
            expect(response.body.customer.contact.email).toEqual(
                'jane@test.com'
            )
        })

        it('will return 404 if the customer is not found', async () => {
            const request = {
                name: 'Jane',
            }

            const response = await supertest(app)
                .put(`/customers/10000`)
                .send(request)

            expect(response.status).toEqual(404)
            expect(response.body).toHaveProperty('error')
        })

        it('will return 400 when there are missing fields in the request body', async () => {
            const customer = await createCustomer(
                'John',
                '123456',
                'john@test.com'
            )

            const request = {}

            const response = await supertest(app)
                .put(`/customers/${customer.id}`)
                .send(request)

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })
    })
})
