import React from 'react'

function IngredientsList(props) {
  <ListGroup className="viewRecipeList">
    {
      props.usages.map( (ingredient, i) => (
        <ListGroupItem key={i} className="ingredientItems">
          <div className="quantity">
            {ingredient.quantity}
          </div>
          <div className="unit">
            {ingredient.unit}
          </div>
          <div className="ingredient_name">
            {ingredient.ingredient_name}
          </div>
        </ListGroupItem>
      ))
    }
  </ListGroup>
}


export default IngredientsList
