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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }

    this.signIn = this.signIn.bind(this);
    // this.signOut = this.signOut.bind(this);
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
    const user_id = localStorage.getItem('user');

    if (user_id) {
      this.setState({ user: user_id })
    }
  }
  isSignedIn() {
    return !!this.state.user;
  }
  //
  // signOut() {
  //   localStorage.removeItem('jwt');
  //   this.setState({user: null});
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/recipes" component={RecipeIndexPage} />
            <Route path="/recipes/:id" component={RecipeShowPage} />
            <Route path="/search/:search" component={RecipeSearchPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
