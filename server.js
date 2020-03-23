/* eslint-disable linebreak-style */
const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

const project = require('./api/project-router.js');
const action = require('./api/action-router.js');


server.use('/api/projects', project);
server.use('/api/actions', action);
server.get('*', (req, res) => {
  res.status(200).json({ message: 'it works' });
});
module.exports = server;
