import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

// import recipeData from '../recipeData';
import { Recipe } from '../lib/requests';

class RecipeIndexPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      recipes: [],
      loading: true
    }

    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
  }

  componentDidMount() {
    Recipe.all().then(recipes => {
      this.setState({ recipes: recipes, loading: false })
    })
  }

  deleteRecipe (event) {
    const {currentTarget} = event;

    const {recipes} = this.state;
    const recipeId = parseInt(currentTarget.dataset.id, 10);
    // To delete a recipe, will have to update the state
    // to version of state where that recipe is no longer
    // present.
    this.setState({
      recipes: recipes.filter(recipe => recipe.id !== recipeId)
    })
  }

  addRecipe (newRecipe) {
    const {recipes} = this.state;

    newRecipe.author = {'full_name': 'Dr.Zoidberg'}
    this.setState({
      recipes: [
        newRecipe,
        ...recipes
      ]
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main
          className="RecipeIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Recipes</h2>
          <h4>Loading...</h4>
        </main>
      )
    }

    return (
      <main
        className="RecipeIndexPage"
        style={{margin: '0 1rem'}}
      >
        <h2>Recipes</h2>

        <ul>
          {
            this.state.recipes.map(
              recipe => (
                <li key={recipe.id}>
                  <Link to={`/recipes/${recipe.id}`}>
                    {recipe.title}
                  </Link>
                  <Field name="Author" value={recipe.author.full_name} />
                  <button
                    data-id={recipe.id}
                    onClick={this.deleteRecipe}
                  >
                    Delete
                  </button>
                </li>
              )
            )
          }
        </ul>
      </main>
    )
  }
}

export default RecipeIndexPage
