import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Recipe } from '../lib/requests';

import PageNumber from './PageNumber.js'

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

  seeRecipe(event) {
    const { id } = event.currentTarget.dataset
    Recipe.one(id).then(data => {
      const win = window.open(data.recipe_url, '_blank');
      win.focus();
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <main
          className="RecommendedRecipesPage"
          style={{margin: '0 1rem'}}
        >
          <p>loading..</p>
        </main>
      )
    } else {
      const { page } = this.state
      return (
        <main
          className="RecommendedRecipesPage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <div className="recipeCardList">
              {
                this.state.recipes.map(
                  (recipe, i) => (
                    <div key={i}>
                      <Card className="recipeCard" data-id={recipe.id} onClick={this.seeRecipe}>
                          <CardImg top width="100%" src={recipe.image} />
                        <CardImgOverlay className="flexContainer cardOverlay">
                          <CardTitle className="favouriteButtons">
                            <FontAwesome name="star-o"/>
                            <FontAwesome name="check-circle-o"/>
                          </CardTitle>
                          <CardTitle className="recipeTitle"><p>{recipe.title}</p></CardTitle>
                        </CardImgOverlay>
                      </Card>
                      <div className="ingredientsIndicators">
                        <div className="usedIngredients">
                          <small id={`used-${i}`} data-id={`used-${i}`} onMouseEnter={this.popIn} onMouseLeave={this.popOut}>
                            Used Ingredients: {recipe.usedIngredientCount}
                          </small><br/>
                          <Popover placement="right" isOpen={this.state.popState[`used-${i}`]} target={`used-${i}`} toggle={this.toggle}>
                            <PopoverBody className="usedIngredients">{recipe.usedIngredients.join(',')}</PopoverBody>
                          </Popover>
                        </div>
                        <div className="missedIngredients">
                          <small id={`missed-${i}`} data-id={`missed-${i}`} onMouseEnter={this.popIn} onMouseLeave={this.popOut}>
                            Missed Ingredients: {recipe.missedIngredientCount}
                          </small><br/>
                          <Popover placement="right" isOpen={this.state.popState[`missed-${i}`]} target={`missed-${i}`} toggle={this.toggle}>
                            <PopoverBody className="missedIngredients">{recipe.missedIngredients.join(',')}</PopoverBody>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  )
                )
              }
              </div>
              <PageNumber page={page} />
            </div>
          </div>
        </main>
      )
    }
  }
}

export default RecommendedRecipesPage
