const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Hashing pw
UserSchema.pre('save', function (next) {
  const user = this;

  // If password is modified, generate salt and hash password
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.getUserByUsername = async function (username) {
  try {
    const user = await User.findOne({username});
  } catch (error) {
    console.log('Username is wrong');
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };