const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /users ACTION: INDEX
router.get('/', function(req, res, next) {
  knex.select().from('users').orderBy('created_at', 'ASC').then(users => {
    res.json(users);
  })
});

// PATH: /users/:id ACTION: SHOW
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;

  knex.first().from('users').where( {id: userId}).then(user => {
    res.json(user);
  });
});

// PATH: /users ACTION: CREATE
router.post('/', function(req, res, next) {
  const { username, email, password, password_confirmation } = req.body
  if (email.length > 0) {
    knex.insert({ username, email }).into('users').returning('*').then(user => {
      res.json(user);
    })
  } else {
    res.json({errors: "Invalid Sign Up"})
  }
});

// PATH: /users/:user_id/ownages ACTION: INDEX OF OWNAGES
router.get('/:user_id/ownages', function(req, res, next) {
  const user_id = req.params.user_id;

  knex.select().from('ownages').where({ user_id }).orderBy('ingredient_name').then(ownages => {
    res.json(ownages);
  })
});

// PATH: /users/:user_id/ownages ACTION: CREATE OWNAGES
router.post('/:user_id/ownages', function(req, res, next) {
  const user_id = req.params.user_id;
  const ownagesArray = req.body.value
  //   return { user_id, ingredient_name  }
  // })
  //
  //
  // knex.insert(ownagesArray).into('ownages').then( () => {
  //   knex.select().from('ownages').where({ user_id }).orderBy('ingredient_name').then(ownages => {
  //     res.json(ownages);
  //   })
  // })
  //
  return Promise.all(
    ownagesArray.map(ingredient_name => {
      knex.from('ownages').where({ user_id, ingredient_name }).then( ownage => {
        if (ownage.length === 0) {
          knex.insert({ user_id, ingredient_name}).into('ownages').then( () => {
            return Promise.resolve()})
        }
      })
    })
  )
  .then( () => {
    setTimeout( () => {
      knex.select().from('ownages').where({ user_id }).orderBy('ingredient_name').then(ownages => {
        res.json(ownages);
      })
    }, 50)
  })
});

// PATH: /users/:user_id/ownages/:id ACTION: DESTROY OWNAGE
router.delete('/:user_id/ownages/:id', function(req, res, next) {
  const user_id = req.params.user_id;
  const id = req.params.id;
  knex('ownages').where({ id }).del().then( () => {
    knex.select().from('ownages').where({ user_id }).orderBy('ingredient_name').then(ownages => {
      res.json(ownages);
    })
  })
});

module.exports = router;
