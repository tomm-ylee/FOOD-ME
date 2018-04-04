import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, Popover, PopoverBody } from 'reactstrap';
import { Recipe, Favourite, Complete, ToBuy } from '../lib/requests';

import PageNumber from './PageNumber.js'
import FavouriteButtons from './FavouriteButtons.js'
import LoadingLemon from './LoadingLemon.js'

class RecommendedRecipesPage extends React.Component {
  constructor (props) {
    super(props);
    // const user_id = props.user
    const user_id = localStorage.getItem('user');

    this.state = {
      recipes: [],
      popState: {},
      user_id: user_id,
      loading: true,
      page: 1
    }

    this.seeRecipe = this.seeRecipe.bind(this)
    this.popIn = this.popIn.bind(this)
    this.popOut = this.popOut.bind(this)
    this.upPage = this.upPage.bind(this)
    this.downPage = this.downPage.bind(this)

    this.createFavourite = this.createFavourite.bind(this)
    this.destroyFavourite = this.destroyFavourite.bind(this)
    this.createComplete = this.createComplete.bind(this)

    this.addToBuys = this.addToBuys.bind(this)
  }

  componentDidMount() {
    const { user_id, page } = this.state
    Recipe.all(user_id, page).then(data => {
      if (data) {
        this.setState({ recipes: data.recipes, loading: false })
      }
    })
  }

  popIn(event) {
    const { id } = event.currentTarget.dataset
    const { popState } = this.state
    popState[id] = true

    this.setState({ popState: popState })
  }

  popOut(event) {
    const { id } = event.currentTarget.dataset
    const { popState } = this.state
    popState[id] = false

    this.setState({ popState: popState })
  }

  upPage() {
    let { user_id, page } = this.state
    page += 1
    Recipe.all(user_id, page).then(data => {
      if (data) {
        this.setState({ recipes: data.recipes, page: page })
      }
    })
  }

  downPage() {
    let { user_id, page } = this.state
    if (page > 1) page -= 1
    Recipe.all(user_id, page).then(data => {
      if (data) {
        this.setState({ recipes: data.recipes, page: page })
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
    const { user_id, recipes } = this.state;
    const { recipe_id, recipe_title, image } = params;
    Complete.create({ user_id, recipe_id, recipe_title, image }).then(complete => {
      const recipeIndex = recipes.findIndex(recipe => recipe.id === recipe_id);
      recipes[recipeIndex].complete_id = complete.id;
      this.setState({ recipes });
    })
  }

  addToBuys(event) {
    event.preventDefault();
    const { user_id, recipes, popState } = this.state;
    const { recipe_index, id } = event.currentTarget.dataset;

    const toBuys = recipes[recipe_index].missedIngredients;

    ToBuy.create({value: toBuys}, user_id).then(() => {
      popState[id] = true;
      this.setState({ popState: popState });

      setTimeout(() => {
        popState[id] = false;
        this.setState({ popState: popState });
      }, 500)
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main className="RecommendedRecipesPage">
          <div className="backgroundDiv">
            <LoadingLemon />
          </div>
        </main>
      )
    } else {
      const { page, recipes, popState } = this.state
      return (
        <main className="RecommendedRecipesPage">
          <div className="backgroundDiv">
            <div className="content">
              <div className="recipeCardList">
              {
                recipes.map(
                  (recipe, i) => (
                    <div key={i}>
                      <Card className="recipeCard" data-id={recipe.id} onClick={this.seeRecipe}>
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
                      <div className="ingredientsIndicators">
                        <div className="usedIngredients">
                          <small id={`used-${i}`} data-id={`used-${i}`} onMouseEnter={this.popIn} onMouseLeave={this.popOut}>
                            Used Ingredients: {recipe.usedIngredientCount}
                          </small><br/>
                          <Popover placement="right" isOpen={popState[`used-${i}`]} target={`used-${i}`} toggle={this.toggle}>
                            <PopoverBody className="usedIngredients">{recipe.usedIngredients.join(', ')}</PopoverBody>
                          </Popover>
                        </div>
                        <div className="missedIngredients">
                          <div className="missed flexContainer">
                            <small id={`missed-${i}`} data-id={`missed-${i}`} onMouseEnter={this.popIn} onMouseLeave={this.popOut}>
                              Missed Ingredients: {recipe.missedIngredientCount}
                            </small>
                            <small><a href="" id={`added-${i}`} data-id={`added-${i}`} data-recipe_index={i} onClick={this.addToBuys}>
                              Add to Shop List
                            </a></small>
                          </div>
                          <br/>
                          <Popover className="missedIngredients" placement="right" isOpen={popState[`missed-${i}`]} target={`missed-${i}`} toggle={this.toggle}>
                            <PopoverBody>{recipe.missedIngredients.join(', ')}</PopoverBody>
                          </Popover>
                          <Popover className="addFinished" placement="bottom" isOpen={popState[`added-${i}`]} target={`added-${i}`} toggle={this.toggle}>
                            <PopoverBody>Added</PopoverBody>
                          </Popover>
                        </div>
                      </div>
                    </div>
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

export default RecommendedRecipesPage
