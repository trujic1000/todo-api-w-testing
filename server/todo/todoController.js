const { Todo } = require('./todoModel');

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

module.exports = {
  saveTodo,
  getTodos
}