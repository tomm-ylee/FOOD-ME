// Import Libraries
import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap'

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
      user: [],
      form: "signIn",
      errors: []
    }
    this.createToken = this.createToken.bind(this);
    this.createUser = this.createUser.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.toSignIn = this.toSignIn.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
  }

  createToken(logInParams) {
    const { onSignIn = () => {} } = this.props;
    Token.create(logInParams)
      .then(data => {
        if (!data.errors) {
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signedIn" })
          onSignIn()
          this.props.history.push('/');
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
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signedIn" })
          onSignIn()
          this.props.history.push('/');
        } else {
          this.setState({
            errors: [{
              message: "Invalid email or password!"
            }]
          })
        }
      })
  }

  toSignUp() {
    this.setState({ form: "signUp" })
  }

  toSignIn() {
    this.setState({ form: "signIn" })
  }

  searchRecipe(params) {
    const { searchPhrase } = params;
    this.props.history.push(`/search/${searchPhrase}`)
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
            <p>Already Have a Dish In Mind?</p>
            <RecipeSearch placeHoldText="Search for any dish" onSubmit={this.searchRecipe} />
            <hr/>
            { form === "signIn" ? <SignIn signUpClick={this.toSignUp} onSubmit={this.createToken} /> : null }
            { form === "signUp" ? <SignUp signInClick={this.toSignIn} onSubmit={this.createUser} /> : null }


          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
