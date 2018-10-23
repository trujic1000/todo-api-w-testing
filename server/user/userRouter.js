const userRouter = require('express').Router();

const userController = require('./userController');

userRouter.post('/', userController.signup);

module.exports = { userRouter };