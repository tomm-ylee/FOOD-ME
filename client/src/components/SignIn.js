import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
      <FormGroup>
        <Label for='email'>Email</Label> <br />
        <input type='email' id='email' name='email'/>
      </FormGroup>

      <FormGroup>
        <Label for='password'>Password</Label> <br />
        <input type='password' id='password' name='password' />
      </FormGroup>

      <Button>Sign In</Button> <Link to='/'>Sign Up</Link> <br/>
      <Link to=''>Continue as Guest</Link>
    </Form>
  )
}

export default SignIn
