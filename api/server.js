const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const Users = require('../database/models/user-model')
const Tabs = require('../database/models/tabs-model')

const bcrypt = require('bcryptjs');

const userRouter = require('../database/routes/user-router');
const tabsRouter = require('../database/routes/tabs-router');
// function testMiddleware(req, res, next){
//   console.log(req.body);
//   next();
// }

server.use(helmet());
server.use(express.json());
server.use(cors());


//POSTMAN
server.use('/api', userRouter); 
server.use('/tabs', tabsRouter);

server.get('/', (req, res) => { //add between req and res the testMiddleware fn
  res.send('Sanity Check!');
});



module.exports = server;

