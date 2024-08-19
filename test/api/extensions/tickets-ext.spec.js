const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/createMovie.js");
const { createScreen } = require("../../helpers/createScreen.js");
const { createCustomer } = require("../../helpers/createCustomer.js");

describe("Tickets Endpoint", () => {
  describe("POST /tickets", () => {
    it("will create a ticket and include the data for the customer, contact details, movie, screening and screen", async () => {
      const screen = await createScreen(1);
      const customer = await createCustomer("John", "123456", "john@test.com");
      const movie = await createMovie("Movie 1", 130, screen);

      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id,
      };

      const response = await supertest(app).post("/tickets").send(request);

      expect(response.status).toEqual(201);
      expect(response.body.ticket).not.toEqual(undefined);
      expect(response.body.ticket.screening).not.toEqual(undefined);
      expect(response.body.ticket.screening.screen.number).toEqual(1);
      expect(response.body.ticket.screening.movie.title).toEqual("Movie 1");
      expect(response.body.ticket.screening.movie.runtimeMins).toEqual(130);
      expect(response.body.ticket.screening.screen.number).toEqual(1);
      expect(response.body.ticket.customer).not.toEqual(undefined);
      expect(response.body.ticket.customer.name).toEqual("John");
      expect(response.body.ticket.customer.contact.phone).toEqual("123456");
      expect(response.body.ticket.customer.contact.email).toEqual(
        "john@test.com"
      );
    });

    it("will return 404 if the movie with that id is not found", async () => {
      const request = {
        screeningId:  1000,
        customerId: 1001
      };

      const response = await supertest(app).post(`/tickets`).send(request);

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty("error");
    });

    it("will return 400 when there are missing fields in the request body", async () => {
      const request = {};

      const response = await supertest(app).post(`/tickets`).send(request);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
