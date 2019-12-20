const router = require('express').Router()
const passport = require('passport')
var config = require('./../config/keys')

const admin = require('firebase-admin')
const keys = require('./../config/keys.json')

admin.initializeApp({
  credential: admin.credential.cert(keys)
})

const db = admin.firestore()

const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.send({
        error: 'User not logged in'
      });
  }
}

router.get('/auth/google', passport.authenticate('google', {
  scope: ['email','profile']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  let route = config.dev ? '/auth' : '/App/auth/'
  db.collection('users').doc(req.user.id).set({
    name: req.user.name.givenName,
    email: req.user.emails[0].value,
    photo: req.user.photos[0].value
  })
  res.redirect(route);
});

router.get('/auth', isUserAuthenticated, (req, res) => {
  db.collection('users').doc('103053034123594439456').get().then(user => {
    if(!user.exists) {
      res.status(500).send({
        error: 'User not Found'
      });
    } else {
      res.status(200).send(user.data());
    }
  })
  .catch(err => {
    res.send({
      error: err
    });
  })
});

router.get('/auth/logout', (req, res) => {
  req.logout(); 
  let route = config.dev ? '/auth' : '/App/auth/'
  res.redirect(route);
});

module.exports = router
