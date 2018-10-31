const { User } = require('./userModel');

const _ = require('lodash');

function signup(req, res) {
  const body = _.pick(req.body, ['email', 'password']);
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

module.exports = {
  signup
}