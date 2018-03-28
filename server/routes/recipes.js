const express = require('express');
const request = require('request');
const knex = require('../db/knex');
const router = express.Router();

// RESOURCE ROUTES REQUIREMENT
const commentsRouter = require('./comments');
// MIDDLEWARE SETUP
const app = express();

// ROUTE REDIRECTIONS
// app.use('/:id/comments', commentsRouter);

FOOD2FOOK_DOMAIN = "http://food2fork.com/api/"
API_KEY = "a6c0a0d863187bd15f40a0f7ecf370b0";
// PATH: /recipes ACTION: INDEX
router.get('/', function(req, res, next) {
  console.log("Index");
  knex.select().from('recipes').orderBy('created_at', 'DESC').then(recipes => {
    res.json({recipes});
  })
});

// PATH: /recipes ACTION: SEARCH
router.get('/search/:search', function(req, res, next) {
  console.log("Search");
  const search = req.params.search
  request(
    `${FOOD2FOOK_DOMAIN}/search?key=${API_KEY}&q=${search}`, // Use %20 for space, and use "," to separate ingredients
    (err, apiResponse, data) => {
      res.send(apiResponse.body)
    }
  )
});

// PATH: /recipes/:id ACTION: SHOW

router.get('/:id', function(req, res, next) {
  const recipeId = req.params.id;

  knex.first().from('recipes').where({ id: recipeId }).then(recipe => {
    return Promise.all([
      knex.select().from('directions').where({ recipe_id: recipeId }).orderBy('step_number', 'ASC').then(directions => {
        recipe.directions = directions;
      }),
      knex.select().from('usages').where({ recipe_id: recipeId }).then(usages => {
        recipe.usages = usages;
      })
    ])
      .then(() => res.json(recipe))
  })
});
// router.get('/:id', function(req, res, next) {
//   const recipeId = req.params.id;
//   console.log("This is in the show action");
//   request(
//     `${FOOD2FOOK_DOMAIN}/get?key=${API_KEY}&rId=${recipeId}`,
//     (err, apiResponse, data) => {
//       res.send(apiResponse.body)
//     }
//   )
// });

// PATH: /recipes ACTION: CREATE
router.post('/', function(req, res, next) {
  const { title, description, duration, directions, ingredients } = req.body
  knex.insert({ title, description, duration }).into('recipes').returning('*').then(recipe => {
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
