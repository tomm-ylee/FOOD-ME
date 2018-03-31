// Import Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import jwtDecode from 'jwt-decode';

// Import Requests
import {  } from './lib/requests'

// Import Component Files
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import RecipeIndexPage from './components/RecipeIndexPage';
import RecipeShowPage from './components/RecipeShowPage';
import RecipeSearchPage from './components/RecipeSearchPage';
import UserIngredientsPage from './components/UserIngredientsPage';
import RecommendedRecipesPage from './components/RecommendedRecipesPage';

class App extends Component {
  constructor(props) {
    super(props);

    document.title = "FOOD-ME"
    this.state = { user: [] }


    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.signIn();
  }

  signIn() {
    // const jwt = localStorage.getItem('jwt');
    //
    // if (jwt) {
    //   const payload = jwtDecode(jwt);
    //   this.setState({
    //     user: payload
    //   });
    // }
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({ user: user })
    }
  }
  isSignedIn() {
    return !!this.state.user;
  }

  signOut() {
    this.setState({user: null});
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <div className="App">
          <NavBar user={user} />
          <Switch>
            <Route
              exact path="/"
              render={ props => (<HomePage {...props} onSignIn={this.signIn} onSignOn={this.signOn} />) }
            />
            <Route exact path="/recipes" component={RecipeIndexPage} />
            <Route path="/recipes/:id" component={RecipeShowPage} />
            <Route path="/search/:search" component={RecipeSearchPage} />
            <Route path="/ingredients/:user_id" component={UserIngredientsPage} />
            <Route path="/recipes/" component={RecommendedRecipesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
