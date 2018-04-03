import React from 'react';
import { Favourite, Complete, Recipe } from '../lib/requests';
import { Button } from 'reactstrap'
import FavouriteRecipes from './FavouriteRecipes';
import CompletedRecipes from './CompletedRecipes';

class SavedRecipePage extends React.Component {
  constructor (props) {
    super(props);
    // const user_id = props.user
    const user_id = localStorage.getItem('user');

    this.state = {
      favourites: [],
      completes: [],
      user_id: user_id,
      loading: true,
      view: "1"
    }
    this.destroyFavourite = this.destroyFavourite.bind(this);
    this.destroyComplete = this.destroyComplete.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.changeView = this.changeView.bind(this);
    this.seeRecipe = this.seeRecipe.bind(this);
  }

  componentDidMount() {
    const { user_id } = this.state;

    return Promise.all([
      Favourite.all(user_id).then(favourites => {
        this.setState({ favourites });
      }),
      Complete.all(user_id).then(completes => {
        this.setState({ completes });
      })
    ])
      .then(() => this.setState({ loading: false }))
  }

  destroyFavourite(params) {
    let { favourites } = this.state;
    const { favourite_id } = params;
    Favourite.destroy(favourite_id).then(() => {
      favourites = favourites.filter(favourite => favourite.id !== parseInt(favourite_id, 10));
      this.setState({ favourites });
    })
  }

  destroyComplete(params) {
    let { completes } = this.state;
    const { complete_id } = params;
    Complete.destroy(complete_id).then(() => {
      completes = completes.filter(complete => complete.id !== parseInt(complete_id, 10));
      this.setState({ completes });
    })
  }

  updateComplete(params) {
    let { completes } = this.state;
    const { complete_id, notes } = params;
    Complete.update({ notes }, complete_id).then(() => {
      const completeIndex = completes.findIndex(complete => complete.id === parseInt(complete_id, 10));
      completes[completeIndex].notes = notes
      this.setState({ completes })
    })
  }

  changeView(event) {
    const { view } = event.currentTarget.dataset;
    this.setState({ view })
  }


  seeRecipe(params) {
    const id = params.recipe_id;
    Recipe.one(id).then(data => {
      const win = window.open(data.recipe_url, '_blank');
      win.focus();
    })
  }

  render() {
    const { loading, favourites, completes, view } = this.state;

    if (loading) {
      return (
        <main
          className="SavedRecipePage containerFluid"
        >
          <div className="backgroundDiv">
            <p>loading..</p>
          </div>
        </main>
      )
    } else {
      return (
        <main
          className="SavedRecipePage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <Button className="btn-outline-dark savedRecipeButton" data-view="1" onClick={this.changeView}>
                Starred
              </Button>

              <Button className="btn-outline-dark savedRecipeButton" data-view="2" onClick={this.changeView}>
                Completed
              </Button>
              { view === "1" ? <FavouriteRecipes goSeeRecipe={this.seeRecipe} goUnfavourite={this.destroyFavourite} favourites={favourites}/> : null }
              { view === "2" ? <CompletedRecipes goSeeRecipe={this.seeRecipe} goUncomplete={this.destroyComplete} goRecomplete={this.updateComplete} completes={completes}/> : null }
            </div>
          </div>
        </main>
      )
    }
  }
}

export default SavedRecipePage
