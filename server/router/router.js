const router = require('express').Router();

const { todoRouter } = require('../todo/todoRouter');
const { userRouter } = require('../user/userRouter');

router.use('/todos', todoRouter);
router.use('/users', userRouter);

module.exports = { router }