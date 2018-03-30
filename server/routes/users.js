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
  const { email, password, password_confirmation } = req.body
  if (email.length > 0) {
    knex
    .insert({ email })
    .into('users')
    .returning('*')
    .then(user => {
      res.json(user);
    })
  } else {
    res.json({errors: "Invalid Sign Up"})
  }
});

// PATH: /users/:user_id/ownages ACTION: INDEX OF OWNAGES
router.get('/:user_id/ownages', function(req, res, next) {
  const userId = req.params.user_id;
  knex
  knex
    .select()
    .from('ownages')
    .where({ user_id })
    .then(ownages => {
      res.json(ownages);
    })
});

module.exports = router;
