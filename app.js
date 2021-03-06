const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const { handle500s, handle404s, handle400s } = require("./errors/errors");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) =>
	res.status(404).send({ msg: "Route not found" })
);

// Error handling middleware
app.use(handle404s);
app.use(handle400s);
app.use(handle500s);

module.exports = app;
