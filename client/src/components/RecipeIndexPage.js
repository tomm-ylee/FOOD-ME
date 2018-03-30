import React from 'react';
import { Link } from 'react-router-dom'
import {
  Card, CardGroup, CardImg, CardText, CardBody, CardTitle, Button
} from 'reactstrap'

import { Recipe } from '../lib/requests';

class RecipeIndexPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true
    }
  }

  componentDidMount() {
    Recipe.all().then(recipes => {
      this.setState({ recipes: recipes, loading: false });
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main
          className="RecipeIndexPage"
          style={{margin: '0 1rem'}}
        >
          <p>loading..</p>
        </main>
      )
    } else {
      return (
        <main
          className="RecipeIndexPage"
        >
          <div className="backgroundDiv">
            <div className="content recipeCardList">
              {
                this.state.recipes.map(
                  recipe => (
                    <Card className="recipeCard" key={recipe.id}>
                      <Link to={`/recipes/${recipe.id}`}>
                        <CardImg top width="100%" src={require('../images/spaghetti.jpg')} />
                      </Link>
                      <CardBody>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardText>{recipe.description}</CardText>
                        <CardText>
                          Key Ingredients: {/* recipe.usages.filter( ingredient => ingredient.key_ingredient).join(',') */}
                        </CardText>
                      </CardBody>
                    </Card>
                  )
                )
              }
              </div>
          </div>
        </main>
      )
    }
  }
}

export default RecipeIndexPage
