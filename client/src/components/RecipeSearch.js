import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function RecipeSearch(props) {
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      props.onSubmit({
        searchPhrase: formData.get('searchPhrase').replace(/ /g, "%20")
      })
    }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <input type='searchPhrase' id='searchPhrase' name='searchPhrase' placeholder='Search for any dish'/>
      </FormGroup>

    </Form>
  )
}

export default RecipeSearch
