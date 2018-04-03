import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap'

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
    const { recipe_id } = event.currentTarget.dataset;
    goSeeRecipe({ recipe_id })
  }

  return (
    <div>
      <h1 className="centerHeader">Completed Recipes</h1>
      <div className="completedRecipes savedRecipes flexContainer">
        {
          completes.map(complete => (
            <div key={complete.id} className="completeItem flexContainer">
              <img className="savedImg" src={complete.image} onClick={seeRecipe} alt=""/>
              <div>
                <div>
                  <span>{complete.recipe_title + "    "}</span>
                  <Button data-complete_id={complete.id} onClick={uncompleteThis}>Remove</Button>
                </div>
                <Form data-complete_id={complete.id} onSubmit={addNote}>
                  <FormGroup>
                    <Input type="textarea" className="notesTextarea" name="notes" defaultValue={complete.notes}></Input>
                  </FormGroup>
                  <Button>Save</Button>
                </Form>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CompletedRecipes
