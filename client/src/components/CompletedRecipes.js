import React from 'react';
import { Button, Form, FormGroup, Input, Card, CardImg, CardImgOverlay, CardTitle, Popover, PopoverBody } from 'reactstrap'
import FontAwesome from 'react-fontawesome';

function CompletedRecipes(props) {
  const {
    completes,
    popState,
    goUncomplete = () => {},
    goRecomplete = () => {},
    goSeeRecipe = () => {},
    goTogglePop = () => {}
  } = props

  const uncompleteThis = event => {
    event.stopPropagation();
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
    event.preventDefault();
    const { recipe_id } = event.currentTarget.dataset;
    goSeeRecipe({ recipe_id })
  }

  const togglePopOn = event => {
    const { complete_id } = event.currentTarget.dataset;
    goTogglePop({ id: complete_id, setTo: true });
  }

  const togglePopOff = event => {
    const { complete_id } = event.currentTarget.dataset;
    goTogglePop({ id: complete_id, setTo: false });
  }

  const toggle = () => {}

  return (
    <div>
      <div className="niceHeaderDiv">
        <h1 className="niceHeader padLeft">Completed Recipes</h1>
      </div>
      <div className="completedRecipes savedRecipes flexContainer">
        {
          completes.map(complete => (
            <div key={complete.id} className="completeItem flexContainer">

              <Card className="recipeCard completed" data-recipe_id={complete.recipe_id} onClick={seeRecipe} onMouseEnter={toggle} onMouseLeave={toggle}>
                <CardImg top width="100%" src={complete.image} />
                <CardImgOverlay className="flexContainer cardOverlay">
                  <div>
                    <FontAwesome
                      id={`remove-${complete.id}`}
                      className="grayFa"
                      onMouseEnter={togglePopOn}
                      onMouseLeave={togglePopOff}
                      data-complete_id={complete.id}
                      onClick={uncompleteThis}
                      name="check"
                      size="2x"
                    />
                  </div>
                </CardImgOverlay>
              </Card>
              <Popover placement="right" isOpen={popState[complete.id]} target={`remove-${complete.id}`} toggle={toggle}>
                <PopoverBody>Remove</PopoverBody>
              </Popover>
              <div className="noteDiv">
                <div>
                  <a href='' onClick={seeRecipe} style={{ textDecoration: 'none' }}>{complete.recipe_title + "    "}</a>
                </div>
                <Form data-complete_id={complete.id} onSubmit={addNote}>
                  <FormGroup>
                    <Input type="textarea" className="notesTextarea" name="notes" defaultValue={complete.notes}></Input>
                  </FormGroup>
                  <Button className="btn-dark noteSaveBtn">Save</Button>
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
