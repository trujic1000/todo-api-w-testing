const { User } = require('./userModel');

function signup(req, res) {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password
  });
  (async function saveUser(){
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser, undefined, 2);
    } catch (error) {
      res.status(400).send(error);
    }
  })();
}

module.exports = {
  signup
}