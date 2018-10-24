const express = require('express');

// Connection to the database
const { mongoose } = require('./db/mongoose');

const { todoRouter } = require('./todo/todoRouter');
const { userRouter } = require('./user/userRouter');

const app = express();
const port = process.env.PORT || 3000;

// Basic Middlewares
require('./middleware/middleware')(app);

// Todo API
app.use('/api/todos', todoRouter);
// User API
app.use('/api/users', userRouter);


// Starting a server
app.listen(port, () => {
  console.log(`Connection started on port ${port}`);
});

module.exports = { app };