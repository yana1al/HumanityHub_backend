const express = require("express");
const router = express.Router();
const { Register, Login, googleLogin } = require("../controllers/auth");

// Regular login and register routes
router.post("/register", Register);
router.post("/login", Login);

// Google OAuth login route
router.post("/google-login", googleLogin);

router.get("/google", (res) => {
    res.json({
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.GOOGLE_CALLBACK,
    });
  });

module.exports = router;
