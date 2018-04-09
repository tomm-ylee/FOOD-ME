import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';

function SignIn(props) {
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    props.onSubmit({
      email: formData.get('email'),
      password: formData.get('password')
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Button className="btn-dark">Sign In</Button> <Link className="signButton" to='' onClick={props.signUpClick}>Sign Up</Link> <br/>
      <FormGroup>
        <Label for='email'>Email</Label> <br />
        <input type='email' id='email' name='email'/>
      </FormGroup>

      <FormGroup>
        <Label for='password'>Password</Label> <br />
        <input type='password' id='password' name='password' />
      </FormGroup>

    </Form>
  )
}

export default SignIn
