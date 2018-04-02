import React from 'react';
import { Card, CardImg, CardLink, CardTitle, CardImgOverlay } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Recipe, Favourite, Complete } from '../lib/requests';

import PageNumber from './PageNumber.js'

class RecipeSearchPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recipes: [],
      searchPhrase: this.props.match.params.search,
      loading: true,
      diet: "none",
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
    const { searchPhrase, page, diet } = this.state

    Recipe.search(searchPhrase, page, diet).then(data => {
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
    const { searchPhrase, page } = this.state;
    let { diet } = this.state;
    diet = (diet === "vegan" ? "" : "vegan")
    this.setState({ diet })

    Recipe.search(searchPhrase, page, diet).then(data => {
      this.setState({ recipes: data.recipes })
    })
  }

  toggleVegetarian() {
    const { searchPhrase, page } = this.state;
    let { diet } = this.state;
    diet = (diet === "vegetarian" ? "" : "vegetarian")
    this.setState({ diet })

    Recipe.search(searchPhrase, page, diet).then(data => {
      this.setState({ recipes: data.recipes })
    })
  }

  upPage() {
    let { searchPhrase, diet, page } = this.state;
    page += 1

    Recipe.search(searchPhrase, page, diet).then(data => {
      this.setState({ recipes: data.recipes, page: page })
    })
  }

  downPage() {
    let { searchPhrase, diet, page } = this.state;
    if (page > 1) page -= 1

    Recipe.search(searchPhrase, page, diet).then(data => {
      this.setState({ recipes: data.recipes, page: page })
    })
  }

  createFavourite(event) {

  }

  destroyFavourite(event) {
    const { id } = event.currentTarget.dataset

    Favourite.destroy(id).then(() => {
      
    })
  }

  createComplete(event) {

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
      const { page, diet } = this.state
      return (
        <main
          className="RecipeSearchPage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <div>
                <input type="checkbox" id="veganCheckbox" checked={diet === "vegan" ? "checked" : ""} onClick={this.toggleVegan}/>
                <label htmlFor="veganCheckbox">Vegan</label>
                <input type="checkbox" id="vegetarianCheckbox" checked={diet === "vegetarian" ? "checked" : ""} onClick={this.toggleVegetarian}/>
                <label htmlFor="vegetarianCheckbox">Vegetarian</label>
              </div>
              <div className="recipeCardList">
              {
                this.state.recipes.map(
                  recipe => (
                    <Card className="recipeCard" key={recipe.id} data-id={recipe.id} onClick={this.seeRecipe}>
                      <CardImg top width="100%" src={recipe.image} />
                      <CardImgOverlay className="flexContainer cardOverlay">
                        <CardTitle className="favouriteButtons">
                          <FontAwesome name="star-o"/>
                          <FontAwesome name="check-circle-o"/>
                        </CardTitle>
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
