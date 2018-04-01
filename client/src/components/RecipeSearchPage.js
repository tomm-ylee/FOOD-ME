import React from 'react';
import { Card, CardImg, CardLink, CardTitle, CardImgOverlay } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Recipe } from '../lib/requests';

import PageNumber from './PageNumber.js'

class RecipeSearchPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      recipes: [],
      searchPhrase: this.props.match.params.search,
      loading: true,
      page: 1
    }
  }

  componentDidMount() {
    const { searchPhrase } = this.state

    Recipe.search(searchPhrase).then(data => {
      this.setState({ recipes: data.recipes, loading: false })
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
      const { page } = this.state
      return (
        <main
          className="RecipeSearchPage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <div className="recipeCardList">
              {
                this.state.recipes.map(
                  recipe => (
                    <Card className="recipeCard" key={recipe.id}>
                      <CardLink href={recipe.sourceUrl}>
                        <CardImg top width="100%" src={recipe.image} />
                        <CardImgOverlay className="flexContainer cardOverlay">
                          <CardTitle className="favouriteButton"><FontAwesome name='start-o' size="2x" /></CardTitle>
                          <CardTitle className="recipeTitle"><p>{recipe.title}</p></CardTitle>
                        </CardImgOverlay>
                      </CardLink>
                    </Card>
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

export default RecipeSearchPage
