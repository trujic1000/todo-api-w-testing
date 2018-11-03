const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { User } = require('./userModel');

// SIGN UP FUNCTION
async function signup(req, res){
  // LODASH METHOD FOR EXCTRACTING PROPERTIES FROM REQUEST
  const body = _.pick(req.body, ['username', 'email', 'password']);
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    res.status(200).send({savedUser});
  } catch (error) {
    res.status(400).send(error);
  }
}

// GET ALL USERS
async function getUsers(req, res) {
  try {
    const users = await User.find();
    if(!users.length) {
      return res.status(404).send();
    }
    return res.status(200).send({users});
  } catch (error) {
    return res.status(400).send(error);
  }
}

// LOGIN FUNCTION
async function login(req, res) {
  const body = _.pick(req.body, ['username', 'password']);
  try {
    // FIND USER BY USERNAME, IF THERE ARE NO MATCH RETURN 404
    const user = await User.findOne({username: body.username});
    if(!user) { return res.status(404).send();}
    // COMPARE PASSWORD SENT IN THE REQUEST AND COMPARE IT TO HASHED 
    // VALUE STORED IN THE DATABASE
    bcrypt.compare(body.password, user.password, (err, result) => {
      if(err || !result) { return res.status(400).send();}
      res.status(200).send({username: body.username});
    });
  } catch (error) {
    res.status(400).send(error);
  }
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

function authenticate(req, res, next) {
  passport.authenticate('local', {failureFlash: true}, (req, res, next) => {
    res.redirect('/api/users');
    next();
  });
}

module.exports = {
  signup,
  getUsers,
  authenticate,
  login
}