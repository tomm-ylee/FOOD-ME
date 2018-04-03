import React from 'react';
import { Favourite, Complete } from '../lib/requests';
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
      view: "completed"
    }
    this.destroyFavourite = this.destroyFavourite.bind(this);
    this.destroyComplete = this.destroyComplete.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
  }

  destroyFavourite(params) {
    let { favourites } = this.state;
    const { favourite_id } = params;
    Favourite.destroy(favourite_id).then(() => {
      favourites = favourites.filter(favourite => favourite.id !== parseInt(favourite_id));
      this.setState({ favourites });
    })
  }

  destroyComplete(params) {
    let { completes } = this.state;
    const { complete_id } = params;
    Complete.destroy(complete_id).then(() => {
      completes = completes.filter(complete => complete.id !== parseInt(complete_id));
      this.setState({ completes });
    })
  }

  updateComplete(params) {
    let { completes } = this.state;
    const { complete_id, notes } = params;
    Complete.update({ notes }, complete_id).then(() => {
      const completeIndex = completes.findIndex(complete => complete.id === parseInt(complete_id));
      completes[completeIndex].notes = notes
      this.setState({ completes })
    })
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
              { view === "favourite" ? <FavouriteRecipes goUnfavourite={this.destroyFavourite} favourites={favourites}/> : null }
              { view === "completed" ? <CompletedRecipes goUncomplete={this.destroyComplete} goRecomplete={this.updateComplete} completes={completes}/> : null }

            </div>
          </div>
        </main>
      )
    }
  }
}

export default SavedRecipePage
