const userRouter = require('express').Router();

const userController = require('./userController');

userRouter.route('/')
  .get(userController.getUsers)
  .post(userController.signup);
userRouter.post('/login', userController.login);

module.exports = { userRouter };