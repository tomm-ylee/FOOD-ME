import React from 'react';
import { Row, Col, Button } from 'reactstrap'
import { Ingredient, User, Ownage } from '../lib/requests';
import MultiSelectField from './MultiSelectField';

class UserIngredientsPage extends React.Component {
  constructor (props) {
    super(props);

    const user_id = props.match.params.user_id

    this.state = {
      ingredients: [],
      user_ownages: [],
      user: [],
      user_id: user_id,
      fieldValue: [],
      loading: true
    }
    this.updateFieldValue = this.updateFieldValue.bind(this)
    this.addIngredients = this.addIngredients.bind(this)
    this.xClick = this.xClick.bind(this)
    this.xEnter = this.xEnter.bind(this)
    this.xLeave = this.xLeave.bind(this)
  }

  componentDidMount() {
    const { user_id } = this.state;

    return Promise.all([
      Ingredient.all().then(ingredients => {
        this.setState({ ingredients });
      }),
      User.one(user_id).then(user => {
        this.setState({ user });
      }),
      Ownage.all(user_id).then(user_ownages => {
        this.setState({ user_ownages });
      })
    ])
      .then(() => this.setState({ loading: false }))
  }

  updateFieldValue(fieldValue) {
    this.setState({ fieldValue })
  }

  addIngredients(selectParams) {
    const { user_id } = this.state;
    Ownage.create(selectParams, user_id).then(user_ownages => {
      this.setState({ user_ownages: user_ownages, fieldValue: [] })
    })
  }

  xClick(event) {
    const { user_id } = this.state;
    const ownage_id = event.currentTarget.dataset.id;

    Ownage.destroy(user_id, ownage_id).then(user_ownages => {
      this.setState({ user_ownages: user_ownages })
    })
  }

  xEnter(event) {
    const deleteX = event.currentTarget;
    deleteX.classList.add('hoverX');
  }

  xLeave(event) {
    const deleteX = event.currentTarget;
    deleteX.classList.remove('hoverX');
  }

  render() {
    const { loading, user, fieldValue, ingredients, user_ownages } = this.state

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
              <h1 className="centerHeader">{user.username}</h1>
              <Row>
                <Col>
                  <h3 className="centerHeader"> Find Your Ingredients: </h3>
                  <MultiSelectField
                    ingredients={ingredients}
                    value={fieldValue}
                    onSelectChange={this.updateFieldValue}
                    onSelectSubmit={this.addIngredients}
                  />
                </Col>
                <Col>
                  <h3 className="centerHeader"> See Your Ingredients: </h3>
                  { user_ownages.length === 0 ? <p>Tell us what you have!</p> : null }
                  <div className="userIngredientList">
                    {
                      user_ownages.map((ownage, i) => (
                        <Button key={ownage.id} data-id={ownage.id} className="ingredientButton">
                          <small
                            data-id={ownage.id}
                            onClick={this.xClick}
                            onMouseEnter={this.xEnter}
                            onMouseLeave={this.xLeave}
                          >
                            ⓧ{' '}
                          </small>
                          {ownage.ingredient_name}
                        </Button>
                      ))
                    }
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </main>
      )
    }
  }
}

export default UserIngredientsPage
