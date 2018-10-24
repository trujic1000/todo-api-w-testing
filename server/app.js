const express = require('express');

// Connection to the database
const { mongoose } = require('./db/mongoose');
// API Router
const { router } = require('./router/router');

const app = express();
const port = process.env.PORT || 3000;

// Basic Middlewares
require('./middleware/middleware')(app);

// API router
app.use('/api', router);

// Starting a server
app.listen(port, () => {
  console.log(`Connection started on port ${port}`);
});

module.exports = { app };