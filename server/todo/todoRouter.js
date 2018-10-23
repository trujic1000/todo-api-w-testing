const todoRouter = require('express').Router();

const todoController = require('./todoController');


todoRouter.post('/', todoController.saveTodo);
todoRouter.get('/', todoController.getTodos);

module.exports = { todoRouter };