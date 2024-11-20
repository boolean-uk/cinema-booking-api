# Cinema Booking API

## Introduction

This project demonstrates my skill to create a working RESTful API using PostgreSQL and Prisma. The API allows interaction with a cinema booking system database and can be tested using tools like Postman.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AtikoSpeed/database-cinema-booking-api
   ```

2. Navigate to the project directory:

   ```bash
   cd database-cinema-booking-api
   ```

3. Install dependencies:

   ```bash
   npm ci
   ```

4. I've included my own .env file for demonstration purposes. **This is temporary and will be deleted**

5. Reset Prisma migrations and set up the database schema:

   ```bash
   npx prisma migrate reset --force
   ```

## Usage

Start the server:

```bash
npm start
```

## Testing with Postman

Use Postman or any other API client to interact with the API endpoints. The available endpoints are:

### Movies

- `GET /movies` - Retrieve a list of movies along with their screenings.
- `GET /movies/{id}` - Retrieve a specific movie by ID along with its screenings.
- `POST /movies` - Create a new movie.
- `PUT /movies/{id}` - Update an existing movie.
- `DELETE /movies/{id}` - Delete a movie.

### Customers

- `POST /customers/register` - Register a new customer.
- `PUT /customers/{id}` - Update a customer's information.

### Screens

- `POST /screens` - Create a new screen.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Postman (for testing)
