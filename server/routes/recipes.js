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
      return Promise.all([
        knex
        .select()
        .from('directions')
        .where({ recipe_id: recipeId })
        .orderBy('step_number', 'ASC')
        .then(directions => {
          recipe.directions = directions;
        }),
        knex
        .select()
        .from('usages')
        .where({ recipe_id: recipeId })
        .then(usages => {
          recipe.usages = usages;
        })
      ])
        .then(() => res.json(recipe))
    })
});

// PATH: /recipes ACTION: CREATE
router.post('/', function(req, res, next) {
  const { title, description, duration, directions, ingredients } = req.body
  knex
    .insert({ title, description, duration })
    .into('recipes')
    .returning('*')
    .then(recipe => {
      let directionsArray = []
      for(let key in directions) {
        directionsArray.push({ "step_number": key, "body": directions[key], "recipe_id": recipe[0].id });
      }

      let ingredientsArray = []
      for(let key in ingredients) {
        ingredientsArray.push({ "ingredient_name": key, "ingredient_id": ingredients[key]["id"], "quantity": ingredients[key]["quantity"], "unit": ingredients[key]["unit"], "recipe_id": recipe[0].id });
      }
      return Promise.all([
        knex.insert(directionsArray).into('directions'),
        knex.insert(ingredientsArray).into('usages')
      ])
        .then(() => res.json(recipe))
    })
});

module.exports = router;
