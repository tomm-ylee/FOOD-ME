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
        <FontAwesome className="goldFa" data-favourite_id={recipe.favourite_id} onClick={unfavouriteThis} name="star" size="2x"/>
        :
        <FontAwesome onClick={favouriteThis} name="star-o" size="2x"/>
      }
      {
        recipe.complete_id
        ?
        <FontAwesome className="grayFa" data-complete_id={recipe.complete_id} onClick={uncompleteThis} name="check" size="2x"/>
        :
        <FontAwesome onClick={completeThis} name="check" size="2x"/>
      }
    </CardTitle>
  )
}

export default FavouriteButtons
