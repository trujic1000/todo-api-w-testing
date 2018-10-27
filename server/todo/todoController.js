const { ObjectID } = require('mongodb');

const { Todo } = require('./todoModel');

// POST /api/todos
async function saveTodo(req, res) {
  // Destructuring data from the request
  const { text, completed } = req.body;
  const newTodo = new Todo({
    text,
    completed
  });
  try {
    const savedTodo = await newTodo.save();
    res.status(200).send(savedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
}

// GET /api/todos
async function getTodos(req, res){
  try {
    // Fetching all todos
    const todos = await Todo.find();
    res.status(200).send({todos});
  } catch (error) {
    res.status(400).send(error);
  }
}

// GET /api/todos/:id
async function getTodo(req, res) {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  try {
    const todo = await Todo.findById(id);
    if(!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  } catch (error) {
    res.status(400).send(error);
  }
}

// DELETE /api/todos/:id
async function deleteTodo(req, res) {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  try {
    const deletedTodo = await Todo.findByIdAndRemove(id);
    if(!deletedTodo) {
      return res.status(404).send();
    }
    res.status(200).send({deletedTodo});  
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  saveTodo,
  getTodos,
  getTodo,
  deleteTodo
}