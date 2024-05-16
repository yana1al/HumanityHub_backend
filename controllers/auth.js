// controllers/auth.js
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../middleware/auth");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/User");

const Register = async (req, res) => {
  // Validation middleware
  await body('fullname').isString().notEmpty().run(req);
  await body('username').isString().notEmpty().run(req);
  await body('email').isEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ fullname, username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "Username/Email and password are required" });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
      expiresIn: "30m",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, fullname: name });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
      expiresIn: '30m',
    });
    const passport = require('passport');

// Google OAuth login controller
exports.googleLogin = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

// Google OAuth callback controller
exports.googleLoginCallback = passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect to a success page or return JWT token
  res.redirect('/');
};

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  Register,
  Login,
  googleLogin,
};
