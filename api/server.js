const express = require('express');
const usersRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(logger);  // Applying logger middleware globally

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('<h2>API is running</h2>');
});

module.exports = server;
