const { User } = require('./userModel');

function signup(req, res) {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password
  });
  (async function saveUser(){
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser, undefined, 2);
    } catch (error) {
      res.status(400).send('Unable to save user', error);
    }
  })();
}

module.exports = {
  signup
}