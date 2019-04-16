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

//POSTMAN
server.use('/api', userRouter); 
server.use('/tabs', tabsRouter);

server.get('/', (req, res) => {
  res.send('Sanity Check!');
});

// START
server.post('/register', (req, res) => {
  console.log(req.body)
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  !user.username || !user.password
  ? res.status(400).json({ error: 'Please Provide a Username & Password'})
  : 
  Users
      .addUser(req.body)
      .then(user => {
          const token = generateToken(user);
          res.status(201).json({user, token})
      })
      .catch(err => {
          res.status(505).json(err)
      })
})

server.post('/login', (req, res) => {

  let { username, password } = req.body;

Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

});


module.exports = server;

