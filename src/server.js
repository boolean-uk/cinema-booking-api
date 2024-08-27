const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

// Add middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
const customersRouter = require("./routers/customers");
const moviesRouter = require("./routers/movies");
const prisma = require("./utils/prisma");
app.use("/customers", customersRouter);
app.use("/movies", moviesRouter);

module.exports = app;
