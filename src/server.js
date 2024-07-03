const express = require('express');
const app = express();
require("express-async-errors")

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tell express to use your routers here
const customerRouter = require('./routers/customer');
const movieRouter = require('./routers/movies')
const screenRouter = require('./routers/screens')
const ticketsRouter = require('./routers/tickets.js')
const reviewsRouter = require("./routers/reviews.js")
app.use('/customers', customerRouter);
app.use('/movies', movieRouter);
app.use('/screens', screenRouter);
app.use('/tickets', ticketsRouter);
app.use('/reviews', reviewsRouter)

const { MissingFieldsError, DataAlreadyExistsError, DataNotFoundError } = require("./errors/errors.js")


//Errors
app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
         })
    }

    if (error instanceof DataAlreadyExistsError) {
        return res.status(409).json({
            error: error.message
         })
    }

    if (error instanceof DataNotFoundError) {
        return res.status(404).json({
            error: error.message
         })
    }
})

module.exports = app
