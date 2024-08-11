const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/createCustomer.js");

describe("Customer Endpoint", () => {
  describe("POST /customers/register", () => {
    fit("will create a new customer", async () => {
      const request = {
        name: "john",
        phone: "123456",
        email: "john@test.com",
      };

      const response = await supertest(app)
        .post("/customers/register")
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.customer).not.toEqual(undefined);
      expect(response.body.customer.id).not.toEqual(undefined);
      expect(response.body.customer.name).toEqual(request.name);
      expect(response.body.customer.contact.phone).toEqual(request.phone);
      expect(response.body.customer.contact.email).toEqual(request.email);
    });

    it("will return 400 if one of the required fields is missing", async () => {
      const response = await supertest(app)
        .post("/customers/register")
        .send({});

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 409 when attemping to register a customer with an in-use email address", async () => {
      const request = {
        name: "john",
        phone: "123456",
        email: "john@test.com",
      };

      await createCustomer(request.name, request.phone, request.email);

      const response = await supertest(app)
        .post("/customers/register")
        .send(request);

      expect(response.status).toEqual(409);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /customers/:id", () => {
    it("can update a customers name", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com");

      const request = {
        name: "Jane",
      };

      const response = await supertest(app)
        .put(`/customers/${customer.id}`)
        .send(request);

      expect(response.status).toEqual(201);
      expect(response.body.customer).not.toEqual(undefined);
      expect(response.body.customer.name).toEqual(request.name);
      expect(response.body.customer.contact).not.toEqual(undefined);
      expect(response.body.customer.contact.phone).toEqual("123456");
      expect(response.body.customer.contact.email).toEqual("john@test.com");
    });
  });
});
