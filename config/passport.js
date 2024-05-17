passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://humanity-hub1-3599a88da879.herokuapp.com/oauth2callback'
  },
  (accessToken, done) => {
    
    const { google } = require('googleapis');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    oauth2.userinfo.get((err, response) => {
      if (err) {
        return done(err);
      }

      const userData = response.data;
      
      done(null, userData);
    });
  }
));
