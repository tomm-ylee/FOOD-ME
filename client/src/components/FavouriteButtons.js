import React from 'react';
import { CardTitle } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

function FavouriteButtons(props) {
  const { recipe, onFavourite = () => {}, onUnfavourite = () => {}, onComplete = () => {} } = props

  const favouriteThis = event => {
    event.stopPropagation();
    onFavourite({
      recipe_id: recipe.id,
      recipe_title: recipe.title,
      image: recipe.image
    });
  }

  const unfavouriteThis = event => {
    event.stopPropagation();
    const { favourite_id } = event.currentTarget.dataset;
    onUnfavourite({
      favourite_id: favourite_id,
      recipe_id: recipe.id
    });
  }

  const completeThis = event => {
    event.stopPropagation();
    onComplete({
      recipe_id: recipe.id,
      recipe_title: recipe.title,
      image: recipe.image
    });
  }

  const uncompleteThis = event => {
    event.stopPropagation();
  }

  return (
    <CardTitle className="favouriteButtons">
      {
        recipe.favourite_id
        ?
        <FontAwesome data-favourite_id={recipe.favourite_id} onClick={unfavouriteThis} name="star"/>
        :
        <FontAwesome onClick={favouriteThis} name="star-o"/>
      }
      {
        recipe.complete_id
        ?
        <FontAwesome data-complete_id={recipe.complete_id} onClick={uncompleteThis} name="check-circle"/>
        :
        <FontAwesome onClick={completeThis} name="check-circle-o"/>
      }
    </CardTitle>
  )
}

export default FavouriteButtons
