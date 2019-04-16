const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../../auth/authenticate');

const Users = require('../models/user-model')

const db = require('../dbConfig')

function generateToken(user) {
  const secret = jwtKey;
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {

    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    !user.username || !user.password
    ? res.status(400).json({ error: 'Username & Password Required'})
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

router.post('/login', (req, res) => {

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

router.get('/:id/tabs', authenticate, (req, res) => {
    const id = req.params.id
    db('users')
      .where({id})
      .then(user => {
        db('tabs')
          .where({user_id: id})
          .then(tabs => res.status(200).json({...user[0], tabs}))
      })
      .catch(err  => res.status(500).json(err))
  })

module.exports = router;
