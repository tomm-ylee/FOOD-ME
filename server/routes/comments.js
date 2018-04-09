const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /comments ACTION: INDEX of a RECIPE
router.get('/', function(req, res, next) {
  const recipeId = req.params.recipe_id;

  knex
    .first()
    .from('comments')
    .where({ id: recipeId })
    .orderBy('created_at', 'ASC')
    .then(comments => {
      res.json(comments);
    })
});

// PATH: /comments ACTION: CREATE
router.post('/', function(req, res, next) {
  const { body, rating } = req.body

  knex
    .insert({ body, rating })
    .into('comments')
    .returning('*')
    .then(comment => {
      res.json(comment);
    })
});

module.exports = router;
