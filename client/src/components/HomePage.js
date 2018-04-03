// Import Libraries
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
// Import Requests
import { Token, User } from '../lib/requests';

// Import Component Files
import SignIn from './SignIn'
import SignUp from './SignUp'
import RecipeSearch from './RecipeSearch'


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "signIn",
      errors: []
    }
    this.createToken = this.createToken.bind(this);
    this.createUser = this.createUser.bind(this);
    this.makeGuest = this.makeGuest.bind(this);

    this.toSignUp = this.toSignUp.bind(this);
    this.toSignIn = this.toSignIn.bind(this);
    this.toSignOut = this.toSignOut.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem("user")
    if (user) this.setState({ form: "signOut"})
    document.querySelector("nav.NavBar").classList.add("hidden")
  }

  componentWillUnmount() {
    document.querySelector("nav.NavBar").classList.remove("hidden")
  }

  createToken(logInParams) {
    const { onSignIn = () => {} } = this.props;
    Token.create(logInParams)
      .then(data => {
        if (!data.errors) {
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signOut" });
          onSignIn()
          this.props.history.push(`/ingredients`);
        } else {
          this.setState({
            errors: [{
              message: "Invalid email or password!"
            }]
          })
        }
      })
  }

  createUser(signUpParams) {
    const { onSignIn = () => {} } = this.props;
    User.create(signUpParams)
      .then(data => {
        if (!data.errors) {
          console.log("In if block");
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signOut" })
          onSignIn()
          this.props.history.push(`/ingredients`);
        } else {
          this.setState({
            errors: [{
              message: "Invalid email or password!"
            }]
          })
        }
      })
  }

  makeGuest(event) {
    event.preventDefault();
    this.createUser({
      username: "guest",
      email: `guest-  ${Date.now()}@foodme.ca`,
      password: "tester",
      password_confirmation: "tester"
    })
  }

  toSignUp() {
    this.setState({ form: "signUp" })
  }

  toSignIn() {
    this.setState({ form: "signIn" })
  }

  toSignOut() {
    const { onSignOut = () => {} } = this.props;

    // localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.setState({ form: "signIn" })
    onSignOut()
  }

  render() {
    const { form } = this.state;
    return (
      <main
        className="HomePage"
      >
          <div className="backgroundDiv">
          <Jumbotron
            id="signin-jumbotron"
          >
            <h1 className="display-3 homeTitle">FOOD-ME</h1>
            <p>Already Have Something In Mind?</p>
            <RecipeSearch id="homeSearchBar" placeHoldText="Search for any dish.."/>
            <hr/>
            {
              form === "signIn" || form === "signUp"
              ?
              <Link to="/" onClick={this.makeGuest}>Continue as guest</Link>
              :
              null
            }
            { form === "signIn" ? <SignIn signUpClick={this.toSignUp} onSubmit={this.createToken} /> : null }
            { form === "signUp" ? <SignUp signInClick={this.toSignIn} onSubmit={this.createUser} /> : null }
            { form === "signOut" ? <Button onClick={this.toSignOut}>Sign Out</Button> : null }
            {
              form === "signOut"
              ?
              <div>
                <Link to="/ingredients">Your Ingredients</Link><br/>
                <Link to="/saved">Saved Recipes</Link><br/>
                <Link to="/recipes">View Recipes</Link><br/>
              </div>
              :
              null
            }
          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
