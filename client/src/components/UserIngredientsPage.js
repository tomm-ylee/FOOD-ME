import React from 'react';
import {  } from 'reactstrap'
import { Ingredient, Ownage } from '../lib/requests';
import MultiSelectField from './MultiSelectField';

class UserIngredientsPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ingredients: [],
      user_ownages: [],
      user: this.props.user,
      fieldValue: [],
      loading: true
    }
    this.updateFieldValue = this.updateFieldValue.bind(this)
  }

  componentDidMount() {
    return Promise.all([
      Ingredient.all().then(ingredients => {
        this.setState({ ingredients: ingredients });
      })
    ])
      .then(() => this.setState({ loading: false }))
  }

  updateFieldValue(fieldValue) {
    this.setState({ fieldValue })
  }

  render() {
    const { loading, user, fieldValue, ingredients, user_usages } = this.state

    if (loading) {
      return (
        <main
          className="UserIngredientsPage containerFluid"
        >
          <div className="backgroundDiv">
            <p>loading..</p>
          </div>
        </main>
      )
    } else {
      return (
        <main
          className="UserIngredientsPage"
        >
          <div className="backgroundDiv">
            <div className="content">
              <MultiSelectField
                ingredients={ingredients}
                value={fieldValue}
                onFieldChange={this.updateFieldValue}
              />
              <div>
                {
                  Object.keys(ingredients).map((foodGroup,i) => (
                    <ul>
                      <h4 key={i}>{foodGroup.toUpperCase()}</h4>
                      {
                        ingredients[foodGroup].map((ingredient,j) => (
                          <li key={j}>{ingredient}</li>

                        ))
                      }
                    </ul>
                  ))
                }
              </div>
            </div>
          </div>
        </main>
      )
    }
  }
}

export default UserIngredientsPage
