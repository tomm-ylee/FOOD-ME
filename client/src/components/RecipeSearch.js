import React from 'react';
import { } from 'react-router-dom';
import { Form, FormGroup } from 'reactstrap';

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
        <input type='searchPhrase' id='searchPhrase' name='searchPhrase' placeholder={props.placeHoldText}/>
      </FormGroup>

    </Form>
  )
}

export default RecipeSearch
