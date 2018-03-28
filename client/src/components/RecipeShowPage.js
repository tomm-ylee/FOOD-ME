import React from 'react';
import { ListGroup, ListGroupItem, Form, FormGroup, Label, Button, Input } from 'reactstrap'

import { Recipe } from '../lib/requests';

class RecipeShowPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      recipe: [],
      comments: [0],
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind('this');
  }

  componentDidMount() {
    const recipeId = this.props.match.params.id;

    Recipe.one(recipeId).then(recipe => {
      this.setState({ recipe: recipe, loading: false })
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);


  }

  render() {
    const { loading, comments, recipe } = this.state
    const { directions, usages } = recipe

    if (loading) {
      return (
        <main
          className="RecipeShowPage containerFluid"
        >
          <p>loading..</p>
        </main>
      )
    } else {
      return (
        <main
          className="RecipeShowPage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <h2>{recipe.title}</h2>
              <img className="recipeImage" src={require('../images/spaghetti.jpg')} />
              <p>{recipe.description}</p>
              <p><em>(Duration: {recipe.duration} minutes)</em></p>
              <ListGroup className="viewRecipeList">
                {
                  usages.map( (ingredient, i) => (
                    <ListGroupItem key={i} className="ingredientItems">
                      <div className="quantity">
                        {ingredient.quantity}
                      </div>
                      <div className="unit">
                        {ingredient.unit}
                      </div>
                      <div className="ingredient_name">
                        {ingredient.ingredient_name}
                      </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
              <h4 className="showHeader">Methods</h4>
              <ListGroup className="viewRecipeList">
                {
                  directions.map( (direction) => (
                    <ListGroupItem key={direction.step_number} className="directionItem">
                      <strong>{direction.step_number}. </strong> {direction.body}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
              <h4 className="showHeader">Comments</h4>
              <ListGroup className="viewRecipeList">
                {
                  comments.map( (comment, i) => (
                    <ListGroupItem key={i} className="commentItem">
                      <div><strong>FamilyDad</strong> wrote: </div>
                      <div>This was such a good meal!! 5/5 Rating </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>

              <Form onSubmit={this.handleSubmit}>
                <Label for='body'><h5 className="showHeader">Add Comment</h5></Label> <br />
                <FormGroup>
                    <Input className="ratingInput" type="select" name="rating" id="rating" style={{width: '50px'}}>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Input>
                </FormGroup>
                <FormGroup>

                  <textarea className="commentInput"name='body'/>
                </FormGroup>
                <Button>Add Comment</Button>
              </Form>
            </div>
          </div>
        </main>
      )
    }
  }
}

export default RecipeShowPage
