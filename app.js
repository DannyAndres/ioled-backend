var express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
var config = require('./config/keys')

var app = express();

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day
  keys: ['randomstringhere']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.dev ? '/auth/google/callback' : '/App/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', require('./api'))

// not found 404
app.use((req, res, next) => {
  res.status(404).send({
    error: 'Not Found'
  });
});

module.exports = app;