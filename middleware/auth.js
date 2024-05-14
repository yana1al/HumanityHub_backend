const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET = process.env.APP_SECRET;

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword);
  return passwordMatch;
};

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, APP_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      res.locals.token = token;
      return next();
    }
    res.status(401).send("Unauthorized");
  } catch (e) {
    console.error(e);
    res.status(401).send("Strip Token Error");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  stripToken,
};
