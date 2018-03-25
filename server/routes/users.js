const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /users ACTION: INDEX
router.get('/', function(req, res, next) {
  knex
    .select()
    .from('users')
    .orderBy('created_at', 'ASC')
    .then(users => {
      res.json(users);
    })
});

// PATH: /users/:id ACTION: SHOW
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;

  knex
    .first()
    .from('users')
    .where( {id: userId})
    .then(user => {
      res.json(user);
    });
});

// PATH: /users ACTION: CREATE
router.post('/', function(req, res, next) {
  const { email, username, admin, guest } = req.body

  knex
    .insert({ email, username, admin, guest })
    .into('users')
    .returning('*')
    .then(user => {
      res.json(user);
    })
});

module.exports = router;
