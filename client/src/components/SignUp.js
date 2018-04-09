import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';

function SignUp(props) {
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      props.onSubmit({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
      })
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Link className="signButton" to='' onClick={props.signInClick}>Sign In</Link> <Button className="btn-dark">Sign Up</Button>  <br/>
      <FormGroup>
        <Label for='username'>Username</Label> <br />
        <input type='input' id='username' name='username'/>
      </FormGroup>

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

export default SignUp
