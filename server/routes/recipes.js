const express = require('express');
const unirest = require('unirest');
const knex = require('../db/knex');
const router = express.Router();
const { API_DOMAIN, API_KEY } = require('../key')
const { indexSnap, searchSnap, showSnap } = require('../assets/apiSearches')

// PATH: /recipes/search/:searchPhrase/:page/:diet/:user_id ACTION: SEARCH
router.get('/search/:searchPhrase/:page/:diet/:user_id', function(req, res, next) {res.json(searchSnap)})
router.get('/search/:searchPhrase/:page/:diet/:user_id', function(req, res, next) {
  const { searchPhrase, page, diet, user_id } = req.params
  const perPage = 9
  const offset = (page - 1) * perPage

  let dietSpec = "";
  if (diet === "vegetarian") {
    dietSpec = "&diet=vegetarian"
  } else if (diet === "vegan") {
    dietSpec = "&diet=vegan"
  }

  const searchURL = `${API_DOMAIN}/searchComplex?number=${perPage}&offset=${offset}&query=${searchPhrase}${dietSpec}`
  console.log(searchURL);
  unirest.get(searchURL)
    .header("X-Mashape-Key", API_KEY)
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(result => {
      const recipes = result.body.results
      return Promise.all(
        recipes.map(recipe => {
          return new Promise(resolve => {
            knex.from('favourites').where({ recipe_id: recipe.id, user_id: user_id }).then(favourite => {
              if (favourite.length > 0) recipe.favourite_id = favourite[0].id
            }).then(() => resolve())
          })
          .then(() => {
            return new Promise(resolve => {
              knex.from('completes').where({ recipe_id: recipe.id, user_id: user_id }).then(complete => {
                if (complete.length > 0) recipe.complete_id = complete[0].id
              }).then(() => resolve())
            })
          })
        })
      )
      .then(() => {
        res.json({ recipes: recipes });
      })
    });
});

// PATH: /recipes/:user_id/:page ACTION: INDEX RECIPES
router.get('/:user_id/:page', function(req, res, next) {res.json(indexSnap)})
router.get('/:user_id/:page', function(req, res, next) {
  const { user_id, page} = req.params
  const numOfPages = 3
  const perPage = 9
  const offset = (page - 1) * perPage

  let ownages, user;
  return Promise.all([
    knex.select().from('ownages').where({ user_id }).orderBy('ingredient_name').then(data => {
      ownages = data
    }),
    knex.first().from('users').where({ id: user_id }).then(data => {
      user = data
    })
  ])
  .then(() => {
    const ingredients = ownages.map(ownage => ownage.ingredient_name).join('%2C').replace(/ /g, '+')
    const searchURL = `${API_DOMAIN}/findByIngredients?ingredients=${ingredients}&number=${perPage * numOfPages}&ranking=1&fillIngredients=true`

    unirest.get(searchURL)
    .header("X-Mashape-Key", API_KEY)
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(result => {

      const recipes = result.body.slice(offset, offset + perPage).map( recipe => {
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          usedIngredientCount: recipe.usedIngredientCount,
          missedIngredientCount: recipe.missedIngredientCount,
          usedIngredients: recipe.usedIngredients.map(ingredient => ingredient.name),
          unusedIngredients: recipe.unusedIngredients.map(ingredient => ingredient.name),
          missedIngredients: recipe.missedIngredients.map(ingredient => ingredient.name)
        }
      })

      return Promise.all(
        recipes.map(recipe => {
          return new Promise(resolve => {
            knex.from('favourites').where({ recipe_id: recipe.id, user_id: user_id }).then(favourite => {
              if (favourite.length > 0) recipe.favourite_id = favourite[0].id
            }).then(() => resolve())
          })
          .then(() => {
            return new Promise(resolve => {
              knex.from('completes').where({ recipe_id: recipe.id, user_id: user_id }).then(complete => {
                if (complete.length > 0) recipe.complete_id = complete[0].id
              }).then(() => resolve())
            })
          })
        })
      )
      .then(() => {
        res.json({ recipes: recipes });
      })
    });
  })
});

// PATH: /recipes/:id ACTION: SHOW
router.get('/:id', function(req, res, next) {res.json(showSnap)})
router.get('/:id', function(req, res, next) {
  const recipeId = req.params.id;

  const searchURL = `${API_DOMAIN}/${recipeId}/information`

  unirest.get(searchURL)
    .header("X-Mashape-Key", API_KEY)
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(result => {
      res.json({ recipe_url: result.body.sourceUrl });
    });
});

module.exports = router;
