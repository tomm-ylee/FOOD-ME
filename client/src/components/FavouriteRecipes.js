import React from 'react';
import { Row, Col, Button, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'

function FavouriteRecipes(props) {
  const { favourites, goUnfavourite = () => {}, goSeeRecipe = () => {} } = props
  const unfavouriteThis = event => {
    const { favourite_id } = event.currentTarget.dataset
    goUnfavourite({ favourite_id })
  }

  const seeRecipe = event => {
    goSeeRecipe({  })
  }

  return (
    <div className="FavouriteRecipes flexContainer">
      <Row>
        <Col>
          <h1 className="centerHeader">Starred Recipes</h1>
          <div className="savedRecipes flexContainer">
            {
              favourites.map(favourite => (
                <div key={favourite.id} className="favouriteItem flexContainer">
                  <Card className="recipeCard" data-id={favourite.recipe_id} onClick={seeRecipe}>
                    <CardImg top width="100%" src={favourite.image} />
                    <CardImgOverlay className="flexContainer cardOverlay">
                      <div></div>
                      <CardTitle className="recipeTitle"><p>{favourite.recipe_title}</p></CardTitle>
                    </CardImgOverlay>
                  </Card>
                  <Button data-favourite_id={favourite.id} onClick={unfavouriteThis} >Unfavourite</Button>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default FavouriteRecipes
