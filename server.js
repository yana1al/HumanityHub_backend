require("dotenv").config();
require("./config/db.connection");


const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const authRouter = require("./routes/auth");
const donationsRouter = require("./routes/donations");
const eventsRouter = require("./routes/events");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/auth", authRouter);
app.get("/donations", donationsRouter);
app.use("/events", eventsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));