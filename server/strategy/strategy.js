const Auth0Strategy = require("passport-auth0");
const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;
module.exports = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    callbackURL: "/auth",
    scope: "openid profile"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
