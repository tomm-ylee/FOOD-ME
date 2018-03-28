import React from 'react';
import { Link } from 'react-router-dom'
import {
  Card, CardGroup, CardImg, CardText, CardBody, CardTitle, Button
} from 'reactstrap'

import { Recipe } from '../lib/requests';

class RecipeSearchPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recipes: [],
      searchPhrase: this.props.match.params.search,
      loading: true
    }
  }

  componentDidMount() {
    const { searchPhrase } = this.state
    Recipe.search(searchPhrase).then(recipes => {
      console.log(recipes);
      this.setState({ recipes: recipes, loading: true })
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main
          className="RecipeSearchPage"
          style={{margin: '0 1rem'}}
        >
          <p>loading..</p>
        </main>
      )
    } else {
      return (
        <main
          className="RecipeSearchPage"
        >
          <div className="backgroundDiv">
            <div className="content recipeCardList">
              {
                this.state.recipes.map(
                  recipe => (
                    <Card className="recipeCard" key={recipe.recipe_id}>
                      <Link to={``}>
                        <CardImg top width="100%" src={recipe.image_url} />
                      </Link>
                      <CardBody>
                        <CardTitle>{recipe.title}</CardTitle>
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

export default RecipeSearchPage
