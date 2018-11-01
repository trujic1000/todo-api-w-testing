const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('./userModel');

function signup(req, res) {
  const body = _.pick(req.body, ['username', 'email', 'password']);
  const newUser = new User(body);
  (async function saveUser(){
    try {
      const savedUser = await newUser.save();
      res.status(200).send({savedUser});
    } catch (error) {
      res.status(400).send(error);
    }
  })();
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

function login(req, res) {
  passport.authenticate('local', {failureFlash: true}, (req, res) => {
    res.redirect('/api/users');
  });
}

module.exports = {
  signup,
  login
}