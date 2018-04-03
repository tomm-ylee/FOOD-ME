const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /favourites/:user_id ACTION: INDEX
router.get('/:user_id', function(req, res, next) {
  const { user_id } = req.params
  knex.select().from('favourites').where({ user_id }).orderBy('recipe_title', 'ASC').then(favourites => {
    res.json(favourites);
  })
});

// PATH: /favourites ACTION: CREATE
router.post('/', function(req, res, next) {
  const { user_id, recipe_id, recipe_title, image } = req.body

  knex.insert({ user_id, recipe_id, recipe_title, image }).into('favourites').returning('*').then(favourite => {
    res.json(favourite[0]);
  })
});

// PATH: /favourites/:id ACTION: DESTROY
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  knex('favourites').where({ id }).del().then(() => res.json({}))
});

module.exports = router;
