const express = require('express');

const config = require('./config/config');
// Connection to the database
const { mongoose } = require('./db/mongoose');
// API Router
const { router } = require('./router/router');

const app = express();

// Basic Middlewares
require('./middleware/middleware')(app);

// API router
app.use('/api', router);

// Starting a server
app.listen(config.PORT, () => {
  console.log(`Connection started on port ${config.PORT}`);
});

module.exports = { app };