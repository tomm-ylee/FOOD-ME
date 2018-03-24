import React, { Component } from 'react';
import './App.css';

import { User } from './lib/requests'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    User.all().then(users => this.setState({ users }))
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        { this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        ) }
      </div>
    );
  }
}

export default App;
