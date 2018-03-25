const knex = require('../db/knex');
const express = require('express');
const router = express.Router();

// PATH: /recipes ACTION: INDEX
router.get('/', function(req, res, next) {
  knex
    .select()
    .from('recipes')
    .orderBy('created_at', 'DESC')
    .then(recipes => {
      res.json(recipes);
    })
});

// PATH: /recipes/:id ACTION: SHOW
router.get('/:id', function(req, res, next) {
  const recipeId = req.params.id;

  knex
    .first()
    .from('recipes')
    .where({ id: recipeId })
    .then(recipe => {
      knex
        .select()
        .from('directions')
        .where({ recipe_id: recipeId })
        .orderBy('step_number', 'ASC')
        .then(directions => {
          recipe.directions = directions;
          res.json(recipe);
        });
    });
});

// PATH: /recipes ACTION: CREATE
router.post('/', function(req, res, next) {
  const { title, description, duration, directions, ingredients } = req.body

  knex
    .insert({ title, description, duration })
    .into('recipes')
    .returning('*')
    .then(recipe => {
      console.log(recipe[0].id);
      let directionArray = []
      for(let key in directions) {
        directionArray.push({ "step_number": key, "body": directions[key], "recipe_id": recipe[0].id });
      }
      knex
        .insert(directionArray)
        .into('directions')
        .then( () => {
          res.json(recipe);
        })
    })
});

module.exports = router;
