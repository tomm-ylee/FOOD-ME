import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Popover, PopoverBody } from 'reactstrap'
import FontAwesome from 'react-fontawesome';

function FavouriteRecipes(props) {
  const { favourites, popState, goUnfavourite = () => {}, goSeeRecipe = () => {}, goTogglePop = () => {} } = props
  const unfavouriteThis = event => {
    event.stopPropagation();
    const { favourite_id } = event.currentTarget.dataset
    goUnfavourite({ favourite_id })
  }

  const seeRecipe = event => {
    const { recipe_id } = event.currentTarget.dataset;
    goSeeRecipe({ recipe_id })
  }

  const togglePopOn = event => {
    const { favourite_id } = event.currentTarget.dataset;
    const setTo = true;
    goTogglePop({ favourite_id, setTo });
  }

  const togglePopOff = event => {
    const { favourite_id } = event.currentTarget.dataset;
    const setTo = false;
    goTogglePop({ favourite_id, setTo });
  }

  const toggle = () => {}

  return (
    <div>
      <h1 className="centerHeader">Starred Recipes</h1>
      <div className="recipeCardList savedRecipes flexContainer">
        {
          favourites.map(favourite => (
            <div key={favourite.id}>
              <Card className="recipeCard" data-recipe_id={favourite.recipe_id} onClick={seeRecipe}>
                <CardImg top width="100%" src={favourite.image} />
                <CardImgOverlay className="flexContainer cardOverlay">
                  <div>
                    <FontAwesome id={`remove-${favourite.id}`} onMouseEnter={togglePopOn} onMouseLeave={togglePopOff} data-favourite_id={favourite.id} onClick={unfavouriteThis} name="star"/>
                  </div>
                  <CardTitle className="recipeTitle"><p>{favourite.recipe_title}</p></CardTitle>
                </CardImgOverlay>
              </Card>
              <Popover placement="right" isOpen={popState[favourite.id]} target={`remove-${favourite.id}`} toggle={toggle}>
                <PopoverBody>Remove</PopoverBody>
              </Popover>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FavouriteRecipes
