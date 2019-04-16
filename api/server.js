const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const Users = require('../database/models/user-model')
const Tabs = require('../database/models/tabs-model')

const userRouter = require('../database/routes/user-router');
const tabsRouter = require('../database/routes/tabs-router');



server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/user', usersRouter);
server.use('/api/tabs', tabsRouter);

server.get('/', (req, res) => {
  res.send('Sanity Check!');
});

module.exports = server;