import React from 'react';
import { Link } from 'react-router-dom'
import {
  Card, CardGroup, CardImg, CardText, CardBody, CardTitle, Button
} from 'reactstrap'

import { Recipe } from '../lib/requests';
import RecipeSearch from './RecipeSearch';

class RecipeSearchPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recipes: [],
      searchPhrase: this.props.match.params.search,
      loading: true
    }

    this.searchRecipe = this.searchRecipe.bind('this')
  }

  componentDidMount() {
    const { searchPhrase } = this.state

    Recipe.search(searchPhrase).then(data => {
      this.setState({ recipes: data.recipes, loading: false })
    })
  }

  searchRecipe(params) {
    const { searchPhrase } = params;
    this.props.history.push(`/search/${searchPhrase}`)
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
            <div className="content">
              <RecipeSearch onSubmit={this.searchRecipe} />
              <br/>
              <div className="recipeCardList">
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
          </div>
        </main>
      )
    }
  }
}

export default RecipeSearchPage
