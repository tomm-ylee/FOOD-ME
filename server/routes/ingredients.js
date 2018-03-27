const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /ingredients ACTION: INDEX
router.get('/', function(req, res, next) {
  knex
    .select()
    .from('ingredients')
    .orderBy('created_at', 'DESC')
    .then(ingredients => {
      res.json(ingredients);
    })
});

// PATH: /ingredients/:id ACTION: SHOW
router.get('/:id', function(req, res, next) {
  const ingredientId = req.params.id;

  knex
    .first()
    .from('ingredients')
    .where({ id: ingredientId })
    .then(ingredient => {
      // knex
      //   .select()
      //   .from('directions')
      //   .where({ ingredient_id: ingredientId })
      //   .orderBy('step_number', 'ASC')
      //   .then(directions => {
      //     ingredient.directions = directions;
          res.json(ingredient);
        // });
    });
});

// PATH: /ingredients ACTION: CREATE
router.post('/', function(req, res, next) {
  const { name, meat, non_key } = req.body

  knex
    .insert({ name, meat, non_key })
    .into('ingredients')
    .returning('*')
    .then(ingredient => {
      res.json(ingredient);
    })
});

module.exports = router;
