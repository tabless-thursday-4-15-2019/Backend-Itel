const express = require('express');
const router = express.Router();

//const Tabs = require('../models/tabs-model')

const db = require('../dbConfig')

const { authenticate } = require('../../auth/authenticate');

//POST
router.post('/', authenticate, (req, res) => { 
  db('pages')
  .insert(req.body)
  .then(id => {
      res.status(200).json(id)
  })
  .catch(err => {
      res.status(500).json(err)
  })
})
//GET
router.get('/', authenticate, (req, res) => {
  db('pages').then(action => {
      res.status(200).json(action)
  }).catch(err => {
      res.status(500).json(err)
  })
})

//GET
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('pages')
  .where({ id })
  .first()
  .then(tab => {
      if (tab) {
        res.status(200).json(tab)
      } else {
        res.status(404).json({ message: 'Tab Not Found'})
      }
    })
  .catch(err => {
    res.status(500).json(err)
  })
})

//DELETE
router.delete('/:id', authenticate,  (req, res) => {
  db('pages')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if (count > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Not Found'})
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'Request Failed' })
  })
})

//PUT
router.put('/:id', authenticate, (req, res) => {
  db('pages')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count > 0) {
      res.status(200).json(count)
    } else {
      res.status(404).json({ message: 'Tab Not Found'})
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'Request Failed'})
  })
})





module.exports = router;