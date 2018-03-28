import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function SignUp(props) {
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      props.onSubmit({
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
      })
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Link to='' onClick={props.signInClick}>Sign In</Link> <Button>Sign Up</Button>  <br/>
      <FormGroup>
        <Label for='email'>Email</Label> <br />
        <input type='email' id='email' name='email'/>
      </FormGroup>

      <FormGroup>
        <Label for='password'>Password</Label> <br />
        <input type='password' id='password' name='password' />
      </FormGroup>

      <FormGroup>
        <Label for='password_confirmation'>Password Confirmation</Label> <br />
        <input type='password' id='password_confirmation' name='password_confirmation' />
      </FormGroup>

    </Form>
  )
}

export default SignUp
