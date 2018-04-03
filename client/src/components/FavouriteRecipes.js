import React from 'react';
import { Button, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'

function FavouriteRecipes(props) {
  const { favourites, goUnfavourite = () => {}, goSeeRecipe = () => {} } = props
  const unfavouriteThis = event => {
    const { favourite_id } = event.currentTarget.dataset
    goUnfavourite({ favourite_id })
  }

  const seeRecipe = event => {
    const { recipe_id } = event.currentTarget.dataset;
    goSeeRecipe({ recipe_id })
  }

  return (
    <div>
      <h1 className="centerHeader">Starred Recipes</h1>
      <div className="recipeCardList savedRecipes flexContainer">
        {
          favourites.map(favourite => (
            <Card className="recipeCard" key={favourite.id} data-recipe_id={favourite.recipe_id} onClick={seeRecipe}>
              <CardImg top width="100%" src={favourite.image} />
              <CardImgOverlay className="flexContainer cardOverlay">
                <div>
                  <Button data-favourite_id={favourite.id} onClick={unfavouriteThis}>Remove</Button>
                </div>
                <CardTitle className="recipeTitle"><p>{favourite.recipe_title}</p></CardTitle>
              </CardImgOverlay>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default FavouriteRecipes
