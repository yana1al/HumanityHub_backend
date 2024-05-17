const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  (accessToken, refreshToken, profile, done) => {
    
    const user = { 
      googleId: profile.id, 
      name: profile.displayName, 
      email: profile.emails[0].value,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
    
    
    const { google } = require('googleapis');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    oauth2.userinfo.get((err, response) => {
      if (err) {
        return done(err);
      }
    
    });

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
