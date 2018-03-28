// Import Libraries
import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap'

// Import Requests
import { Token } from '../lib/requests';

// Import Component Files
import SignIn from './SignIn'


class HomePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: [],
      errors: []
    }
    this.createToken = this.createToken.bind(this);
  }

  createToken (logInParams) {
    const { onSignIn = () => {} } = this.props;
    Token.create(logInParams)
      .then(data => {
        if (!data.errors) {
          // localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', data.id );
          onSignIn()
          this.props.history.push('/');
        } else {
          this.setState({
            errors: [{
              message: "Invalid username or password!"
            }]
          })
        }
      })
  }

  render () {
    const { errors } = this.state;
    return (
      <main
        className="HomePage"
      >
          <div className="backgroundDiv">
          <Jumbotron
            id="signin-jumbotron"
          >
            <h1 className="display-3 homeTitle">FOOD-ME</h1>
            <hr/>

            <SignIn onSubmit={this.createToken} />
          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
