// Import Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import jwtDecode from 'jwt-decode';

// Import Requests
import { User } from './lib/requests'

// Import Component Files
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   users: null
    // }
    //
    // this.signIn = this.signIn.bind(this);
    // this.signOut = this.signOut.bind(this);

  }

  componentDidMount() {
    // this.signIn();
  }

  // signIn() {
  //   const jwt = localStorage.getItem('jwt');
  //
  //   if (jwt) {
  //     const payload = jwtDecode(jwt);
  //     this.setState({
  //       user: payload
  //     });
  //   }
  // }
  // isSignedIn() {
  //   return !!this.state.user;
  // }
  //
  // signOut() {
  //   localStorage.removeItem('jwt');
  //   this.setState({user: null});
  // }

  render() {
    return (
      <Router>
        <div className="App">

          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
