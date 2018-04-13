//IMPORT DEPENDENCIES
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const strategy = require(`${__dirname}/strategy/strategy`);
const authCtrl = require(`${__dirname}/controllers/authCtrl`);
//INITIALIZE APP
const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));
//MIDDLEWARES
app.use(json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: 100000
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  const { id, displayName, name, picture } = user;
  app
    .get("db")
    .getUserByAuthId(id)
    .then(logged => {
      if (!logged[0]) {
        app
          .get("db")
          .addUserByAuthId([
            id,
            displayName,
            name.givenName,
            name.familyName,
            picture
          ])
          .then(registered => {
            return done(null, registered[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, logged[0]);
      }
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

//ENDPOINTS
app.get(
  "/auth",
  passport.authenticate("auth0", {
    connection: "google-oauth2",
    successRedirect: "http://localhost:3001/dashboard",
    failureRedirect: "http://localhost:3000/auth"
  })
);

app.get("/api/user", authCtrl.getUserByAuthId);

//SERVER LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Port listening on: " + port));
