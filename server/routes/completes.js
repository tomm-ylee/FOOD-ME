const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /completes/:user_id ACTION: INDEX
router.get('/:user_id', function(req, res, next) {
  const { user_id } = req.params
  knex.select().from('completes').where.({ user_id }).orderBy('recipe_title', 'ASC').then(completes => {
    res.json(completes);
  })
});

// PATH: /completes ACTION: CREATE
router.post('/', function(req, res, next) {
  const { user_id, recipe_id, recipe_title, image } = req.body

  knex.insert({ user_id, recipe_id, recipe_title, image }).into('completes').returning('*').then(complete => {
    res.json(complete[0]);
  })
});

// PATH: /completes/:id ACTION: DESTROY
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  knex('completes').where({ id })
});


// PATH: /completes/:id ACTION: UPDATE
router.patch('/:id', function(req, res, next) {
  const { notes } = req.body
  const { id } = req.params

  knex('completes').where({ id }).update({ notes })
});


module.exports = router;
