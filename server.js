require("dotenv").config();
require("./config/db.connection");

const { PORT } = process.env;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require('express-session');
const passport = require('passport');



require('./config/passport'); 

const authRouter = require("./routes/auth");
const donationsRouter = require("./routes/donations");
const eventsRouter = require("./routes/events");
const testimoniesRouter = require("./routes/testimonies");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/donations", donationsRouter);
app.use('/api/testimonies', testimoniesRouter);
app.use("/events", eventsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/donations', donationsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

module.exports = app;
