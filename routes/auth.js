const express = require("express");
const passport = require('passport');
const router = express.Router();
const { Register, Login } = require("../controllers/auth");

// Regular login and register routes
router.post("/register", Register);
router.post("/login", Login);

// Google OAuth login route
router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get("/oauth2callback", 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get("/google", (res) => {
    res.json({
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.GOOGLE_CALLBACK,
    });
});

module.exports = router;
