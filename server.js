require("dotenv").config();
require("./config/db.connection");

const { PORT } = process.env;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
const donationsRouter = require("./routes/donations");
const eventsRouter = require("./routes/events");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/donations", donationsRouter);
app.use("/events", eventsRouter);
app.use('/api/donations', donationsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

module.exports = app;
