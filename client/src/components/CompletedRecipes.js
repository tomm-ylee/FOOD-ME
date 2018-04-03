import React from 'react';
import { Row, Col, Button, Card, CardImg, CardImgOverlay, CardTitle, Form, FormGroup, Input } from 'reactstrap'

function CompletedRecipes(props) {
  const { completes, goUncomplete = () => {}, goRecomplete = () => {}, goSeeRecipe = () => {} } = props

  const uncompleteThis = event => {
    const { complete_id } = event.currentTarget.dataset
    goUncomplete({ complete_id })
  }

  const addNote = event => {
    event.preventDefault();
    const { complete_id } = event.currentTarget.dataset;
    const formData = new FormData(event.currentTarget);
    const notes = formData.getAll('notes')[0];
    goRecomplete({ complete_id, notes });
  }

  const seeRecipe = event => {
    goSeeRecipe({  })
  }



  return (
    <div className="CompletedRecipes flexContainer">
      <Row>
        <Col>
          <h1 className="centerHeader">Previous Recipes</h1>
          <div className="savedRecipes flexContainer">
            {
              completes.map(complete => (
                <div key={complete.id} className="completeItem flexContainer">
                  <Card className="recipeCard" data-id={complete.recipe_id} onClick={seeRecipe}>
                    <CardImg top width="100%" src={complete.image} />
                    <CardImgOverlay className="flexContainer cardOverlay">
                      <div></div>
                      <CardTitle className="recipeTitle"><p>{complete.recipe_title}</p></CardTitle>
                    </CardImgOverlay>
                  </Card>
                  <Button data-complete_id={complete.id} onClick={uncompleteThis}>Uncomplete</Button>
                  <Form data-complete_id={complete.id} onSubmit={addNote}>
                    <FormGroup>
                      <Input type="textarea" name="notes">{complete.notes}</Input>
                    </FormGroup>
                    <Button>Save</Button>
                  </Form>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default CompletedRecipes
