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
    if (logInParams.email) {
      Token.create(logInParams)
      .then(data => {
        if (data) {
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signOut" });
          onSignIn()
          this.props.history.push('/ingredients')
        } else {
          this.setState({
            errors: [{
              message: "Invalid email or password!"
            }]
          })
        }
      })
    }
  }

  createUser(signUpParams) {
    const { onSignIn = () => {} } = this.props;
    if (signUpParams.email) {
      User.create(signUpParams)
      .then(data => {
        if (data) {
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          this.setState({ form: "signOut" })
          onSignIn()
          this.props.history.push('/ingredients')
        } else {
          this.setState({
            errors: [{
              message: "Invalid email or password!"
            }]
          })
        }
      })
    }
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
            {
              form === "signOut"
              ?
              <h1 className="display-4"><Link to="/ingredients" id="homeTitle" style={{ textDecoration: 'none' }}>KITCHEN SLATE</Link></h1>
              :
              <h1 className="display-4"><Link to="/" id="homeTitle" style={{ textDecoration: 'none' }}>KITCHEN SLATE</Link></h1>
            }

            {
              form === "signIn" || form === "signUp"
              ?
              <Link to="/" onClick={this.makeGuest}>Continue as guest</Link>
              :
              null
            }
            { form === "signIn" ? <SignIn signUpClick={this.toSignUp} onSubmit={this.createToken} /> : null }
            { form === "signUp" ? <SignUp signInClick={this.toSignIn} onSubmit={this.createUser} /> : null }
            { form === "signOut" ? <div><Button className="btn-dark" onClick={this.toSignOut}>Sign Out</Button></div> : null }

          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
