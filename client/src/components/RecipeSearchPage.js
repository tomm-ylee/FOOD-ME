import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';
import { Recipe, Favourite, Complete } from '../lib/requests';

import PageNumber from './PageNumber.js'
import FavouriteButtons from './FavouriteButtons.js'
import LoadingLemon from './LoadingLemon.js'

class RecipeSearchPage extends React.Component {
  constructor (props) {
    super(props);
    // const user_id = props.user
    const user_id = localStorage.getItem('user');

    this.state = {
      recipes: [],
      searchPhrase: this.props.match.params.search,
      diet: "none",
      user_id: user_id,
      loading: true,
      page: 1
    }

    this.seeRecipe = this.seeRecipe.bind(this)
    this.toggleVegan = this.toggleVegan.bind(this)
    this.toggleVegetarian = this.toggleVegetarian.bind(this)
    this.upPage = this.upPage.bind(this)
    this.downPage = this.downPage.bind(this)

    this.createFavourite = this.createFavourite.bind(this)
    this.destroyFavourite = this.destroyFavourite.bind(this)
    this.createComplete = this.createComplete.bind(this)
  }

  componentDidMount() {
    const { searchPhrase, page, diet, user_id } = this.state

    Recipe.search(searchPhrase, page, diet, user_id).then(data => {
      if (data) {
        this.setState({ recipes: data.recipes, loading: false })
      }
    })
  }

  seeRecipe(event) {
    const { id } = event.currentTarget.dataset
    Recipe.one(id).then(data => {
      const win = window.open(data.recipe_url, '_blank');
      win.focus();
    })
  }

  toggleVegan() {
    const { searchPhrase, page, user_id } = this.state;
    let { diet } = this.state;
    diet = (diet === "vegan" ? "none" : "vegan")
    console.log(diet);
    this.setState({ diet })

    Recipe.search(searchPhrase, page, diet, user_id).then(data => {
      this.setState({ recipes: data.recipes })
    })
  }

  toggleVegetarian() {
    const { searchPhrase, page, user_id } = this.state;
    let { diet } = this.state;
    diet = (diet === "vegetarian" ? "none" : "vegetarian")
    console.log(diet);
    this.setState({ diet })

    Recipe.search(searchPhrase, page, diet, user_id).then(data => {
      this.setState({ recipes: data.recipes })
    })
  }

  upPage() {
    let { searchPhrase, diet, page, user_id } = this.state;
    page += 1

    Recipe.search(searchPhrase, page, diet, user_id).then(data => {
      this.setState({ recipes: data.recipes, page: page })
    })
  }

  downPage() {
    let { searchPhrase, diet, page, user_id } = this.state;
    if (page > 1) page -= 1

    Recipe.search(searchPhrase, page, diet, user_id).then(data => {
      this.setState({ recipes: data.recipes, page: page })
    })
  }

  createFavourite(params) {
    const { user_id, recipes } = this.state
    const { recipe_id, recipe_title, image } = params
    Favourite.create({ user_id, recipe_id, recipe_title, image }).then(favourite => {
      const recipeIndex = recipes.findIndex(recipe => recipe.id === recipe_id);
      recipes[recipeIndex].favourite_id = favourite.id
      this.setState({ recipes })
    })
  }

  destroyFavourite(params) {
    const { recipes } = this.state
    const { recipe_id, favourite_id } = params
    Favourite.destroy(favourite_id).then(() => {
      const recipeIndex = recipes.findIndex(recipe => recipe.id === recipe_id);
      recipes[recipeIndex].favourite_id = null;
      this.setState({ recipes });
    })
  }

  createComplete(params) {
    const { user_id, recipes } = this.state
    const { recipe_id, recipe_title, image } = params
    Complete.create({ user_id, recipe_id, recipe_title, image }).then(complete => {
      const recipeIndex = recipes.findIndex(recipe => recipe.id === recipe_id);
      recipes[recipeIndex].complete_id = complete.id
      this.setState({ recipes })
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main className="RecipeSearchPage">
          <div className="backgroundDiv">
            <LoadingLemon />
          </div>
        </main>
      )
    } else {
      const { page, diet } = this.state
      return (
        <main className="RecipeSearchPage">
          <div className="backgroundDiv">
            <div className="content">
              {/* <div>
                <input type="checkbox" id="veganCheckbox" checked={diet === "vegan" ? "checked" : ""} onClick={this.toggleVegan}/>
                <label htmlFor="veganCheckbox">Vegan</label>
                <input type="checkbox" id="vegetarianCheckbox" checked={diet === "vegetarian" ? "checked" : ""} onClick={this.toggleVegetarian}/>
                <label htmlFor="vegetarianCheckbox">Vegetarian</label>
              </div> */}
              <div className="recipeCardList">
              {
                this.state.recipes.map(
                  recipe => (
                    <Card className="recipeCard" key={recipe.id} data-id={recipe.id} onClick={this.seeRecipe}>
                      <CardImg top width="100%" src={recipe.image} />
                      <CardImgOverlay className="flexContainer cardOverlay">
                        <FavouriteButtons
                          recipe={recipe}
                          onFavourite={this.createFavourite}
                          onUnfavourite={this.destroyFavourite}
                          onComplete={this.createComplete}
                        />
                        <CardTitle className="recipeTitle"><p>{recipe.title}</p></CardTitle>
                      </CardImgOverlay>
                    </Card>
                  )
                )
              }
              </div>
              <PageNumber goUpPage={this.upPage} goDownPage={this.downPage} page={page} />
            </div>
          </div>
        </main>
      )
    }
  }
}

export default RecipeSearchPage
