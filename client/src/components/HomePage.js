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
          localStorage.setItem('jwt', data.jwt);
          onSignIn()
          // .history is only available on props because this component is
          // rendered by a route component.
          // (i.e. <Route route="/sign_in" component={HomePage} />)
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
            {/* <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p> */}
            <hr/>

            <SignIn onSubmit={this.createToken} />
          </Jumbotron>
        </div>
      </main>
    )
  }
}

export default HomePage;
