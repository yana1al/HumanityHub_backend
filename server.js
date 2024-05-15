require("dotenv").config();
require("./config/db.connection");


const { PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const stripe = require("stripe")("rk_test_51PGOC106R1SUboG0ob27UKItDgwi5JrpL5M5OuBkEoEZoN2x3L5Y1FjKsEKaIg8H1LD5SG9fUOwWHbJJjzJ63823005gRvhwDn")

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