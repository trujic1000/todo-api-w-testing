const { ObjectID } = require('mongodb');

const { Todo } = require('./todoModel');

// POST /api/todos
function saveTodo(req, res) {
  // Destructuring data from the request
  const { text, completed } = req.body;
  const newTodo = new Todo({
    text,
    completed
  });
  (async function saveTodo(){
    try {
      const savedTodo = await newTodo.save();
      res.status(200).json(savedTodo, undefined, 2);
    } catch (error) {
      res.status(400).send(error);
    }
  })();
}

// GET /api/todos
function getTodos(req, res) {
  (async function getTodos(){
    try {
      // Fetching all todos
      const todos = await Todo.find();
      res.status(200).send({todos});
    } catch (error) {
      res.status(400).send(error);
    }
  })();
}

// GET /api/todos/:id
function getTodo(req, res) {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  (async function getTodo() {
    try {
      const todo = await Todo.findById(id);
      if(!todo) {
        return res.status(404).send();
      }
      res.status(200).send({todo});
    } catch (error) {
      res.status(400).send(error);
    }
  })();
}

module.exports = {
  saveTodo,
  getTodos,
  getTodo
}