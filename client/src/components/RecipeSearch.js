import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function RecipeSearch(props) {
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      
      props.onSubmit({
        searchWord: formData.get('searchWord')
      })
    }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='searchWord'>Already Have a Dish In Mind?</Label>
        <input type='searchWord' id='searchWord' name='searchWord' placeholder='Search for any dish'/>
      </FormGroup>

    </Form>
  )
}

export default RecipeSearch
