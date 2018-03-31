import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup } from 'reactstrap';

// function RecipeSearch(props) {
function RecipeSearch(props) {
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const searchPhrase = formData.get('searchPhrase').replace(/ /g, "%20")
      props.history.push(`/search/${searchPhrase}`)
    }
  return (
    <Form className="searchBar" onSubmit={handleSubmit}>
      <FormGroup>
        <input type='search' name='searchPhrase' placeholder={props.placeHoldText}/>
      </FormGroup>

    </Form>
  )
}

export default withRouter(RecipeSearch)
