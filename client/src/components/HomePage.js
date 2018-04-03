// Import Libraries
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap'

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
    this.toSignUp = this.toSignUp.bind(this);
    this.toSignIn = this.toSignIn.bind(this);
    this.toSignOut = this.toSignOut.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem("user")
    if (user) this.setState({ form: "signOut"})
    // document.querySelector("nav.NavBar").classList.add("hidden")
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
          this.props.history.push(`/ingredients/${data.id}`);
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
          this.props.history.push(`/ingredients/${data.id}`);
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
            { form === "signIn" ? <SignIn signUpClick={this.toSignUp} onSubmit={this.createToken} /> : null }
            { form === "signUp" ? <SignUp signInClick={this.toSignIn} onSubmit={this.createUser} /> : null }
            { form === "signOut" ? <Button onClick={this.toSignOut}>Sign Out</Button> : null }
          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
