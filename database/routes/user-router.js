const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../../auth/authenticate');

const Users = require('../models/user-model')

const db = require('../dbConfig')


router.post('/register', (req, res) => {

    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    // console.log(user);
    !user.username || !user.password
    ? res.status(400).json({ error: 'Username & Password Required'})
    : 
    Users
        .addUser(user)
        .then(user => {
            const token = generateToken(user);
            // console.log(token);
            res.status(200).json({...user, token})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
  //console.log(req.body); // returns username and password
  let { username, password } = req.body;
  Users.findBy( {username} )
    .then(user => {
      //console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      //console.log(user); //returns value

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          
        });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });

});
router.get('/users', (req, res) => {
  db('users').then(user => {
    return res.status(200).json(user);
  })
  .catch(err  => res.status(500).json(err))
} )


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

  router.get('/:id', (req, res) => {
    const { id } = req.params
    Users
    .getUser(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

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
