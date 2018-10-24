const todoRouter = require('express').Router();

const todoController = require('./todoController');

todoRouter.route('/')
  .post(todoController.saveTodo)
  .get(todoController.getTodos);
// todoRouter.post('/', todoController.saveTodo);
// todoRouter.get('/', todoController.getTodos);
todoRouter.get('/:id', todoController.getTodo);

module.exports = { todoRouter };