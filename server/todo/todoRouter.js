const todoRouter = require('express').Router();

const todoController = require('./todoController');

todoRouter.route('/')
  .post(todoController.saveTodo)
  .get(todoController.getTodos);
todoRouter.route('/:id')
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo)
  .patch(todoController.updateTodo);

module.exports = { todoRouter };