import React from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap'

import { Recipe } from '../lib/requests';

class RecipeShowPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      recipe: [],
      loading: true
    }
  }

  componentDidMount() {
    const recipeId = this.props.match.params.id;

    Recipe.one(recipeId).then(recipe => {
      this.setState({ recipe: recipe, loading: false })
    })
  }

  render() {
    const { loading, recipe } = this.state
    const { directions, usages } = recipe

    console.log(directions);
    console.log(usages);
    if (loading) {
      return (
        <main
          className="RecipeShowPage containerFluid"
          style={{margin: '0 1rem'}}
        >
          <p>loading..</p>
        </main>
      )
    } else {
      return (
        <main
          className="RecipeShowPage"
          style={{margin: '0 1rem'}}
        >
          <div className="backgroundDiv">
            <div className="content">
              <h2>{recipe.title}</h2>
              <img src={require('../images/spaghetti.jpg')} />
              <p>{recipe.description}</p>

              <ListGroup className="viewRecipeList">
                {
                  usages.map( (ingredient, i) => (
                    <ListGroupItem key={i} className="ingredientItems">
                      <div className="quantity">
                        {ingredient.quantity}
                      </div>
                      <div className="unit">
                        {ingredient.unit}
                      </div>
                      <div className="ingredient_name">
                        <strong>{ingredient.ingredient_name}</strong>
                      </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>

              <ListGroup className="viewRecipeList">
                {
                  directions.map( (direction) => (
                    <ListGroupItem key={direction.step_number} className="directionItem">
                      <strong>{direction.step_number}. </strong> {direction.body}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>


            </div>
          </div>
        </main>
      )
    }
  }
}

export default RecipeShowPage
