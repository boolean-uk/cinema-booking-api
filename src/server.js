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
const customerRouter = require("./routers/customer");
app.use("/customers", customerRouter);

const moviesRouter = require("./routers/movies");
app.use("/movies", moviesRouter);

module.exports = app;
