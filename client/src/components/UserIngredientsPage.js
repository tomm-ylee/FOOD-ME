import React from 'react';
import { Row, Col, Button, Collapse } from 'reactstrap'
import { Ingredient, User, Ownage, ToBuy } from '../lib/requests';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart'
import faList from '@fortawesome/fontawesome-free-solid/faList'

import MultiSelectField from './MultiSelectField';
import DefaultPrompt from './DefaultPrompt';
import LoadingLemon from './LoadingLemon';

class UserIngredientsPage extends React.Component {
  constructor (props) {
    super(props);
    // const user_id = props.user
    const user_id = localStorage.getItem('user');

    this.state = {
      ingredients: [],
      ownages: [],
      toBuys: [],
      user: [],
      user_id: user_id,
      fieldValue: [],
      defaultPop: false,
      loading: true
    }
    this.updateFieldValue = this.updateFieldValue.bind(this)
    this.addIngredients = this.addIngredients.bind(this)
    this.xClick = this.xClick.bind(this)
    this.xEnter = this.xEnter.bind(this)
    this.xLeave = this.xLeave.bind(this)

    this.toggleDefaultPop = this.toggleDefaultPop.bind(this)
    this.toggleMultiShop = this.toggleMultiShop.bind(this)
    this.toggleMultiYours = this.toggleMultiYours.bind(this)

    this.updateFieldValueShop = this.updateFieldValueShop.bind(this)
    this.addIngredientsShop = this.addIngredientsShop.bind(this)
    this.xClickShop = this.xClickShop.bind(this)
  }

  componentDidMount() {
    const { user_id } = this.state;

    return Promise.all([
      Ingredient.all().then(ingredients => {
        this.setState({ ingredients });
      }),
      User.one(user_id).then(user => {
        this.setState({ user: user });
      }),
      Ownage.all(user_id).then(ownages => {
        this.setState({ ownages });
      }),
      ToBuy.all(user_id).then(to_buys => {
        this.setState({ to_buys });
      })
    ])
      .then(() => this.setState({ loading: false }))
  }

  updateFieldValue(fieldValue) {
    this.setState({ fieldValue })
  }

  addIngredients(selectParams) {
    const { user_id } = this.state;
    Ownage.create(selectParams, user_id).then(ownages => {
      this.setState({ ownages: ownages, fieldValue: [] })
    })
  }

  xClick(event) {
    const { user_id } = this.state;
    const ownage_id = event.currentTarget.dataset.id;

    Ownage.destroy(user_id, ownage_id).then(ownages => {
      this.setState({ ownages })
    })
  }

  updateFieldValueShop(fieldValueShop) {
    this.setState({ fieldValueShop })
  }

  addIngredientsShop(selectParams) {
    const { user_id } = this.state;
    ToBuy.create(selectParams, user_id).then(to_buys => {
      this.setState({ to_buys: to_buys, fieldValueShop: [] })
    })
  }

  xClickShop(event) {
    const { user_id } = this.state;
    const to_buy_id = event.currentTarget.dataset.id;

    ToBuy.destroy(user_id, to_buy_id).then(to_buys => {
      this.setState({ to_buys })
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

  toggleDefaultPop() {
    this.setState({ defaultPop:!this.state.defaultPop })
  }

  toggleMultiShop(event) {
    event.preventDefault();
    document.querySelectorAll(".shoppingHide").forEach(node => {
      node.classList.toggle('hidden')
    })
  }

  toggleMultiYours(event) {
    event.preventDefault();
    document.querySelectorAll(".yoursHide").forEach(node => {
      node.classList.toggle('hidden')
    })
  }

  render() {
    const { loading, user, fieldValue, fieldValueShop, ingredients, ownages, to_buys, defaultPop } = this.state

    if (loading) {
      return (
        <main className="UserIngredientsPage containerFluid">
          <div className="backgroundDiv">
            <LoadingLemon />
          </div>
        </main>
      )
    } else {
      return (
        <main className="UserIngredientsPage">
          <div className="backgroundDiv">
            <div className="content">
              <div className="niceHeaderDiv">
                <h1 className="niceHeader padLeft">Ingredient Management</h1>
              </div>
              <Row className="overallUserSection ownIngredientSection">
                <Col className="yoursHide" md="4">
                  <Row className="userPageSection">
                    <MultiSelectField
                      ingredients={ingredients}
                      value={fieldValue}
                      onSelectChange={this.updateFieldValue}
                      onSelectSubmit={this.addIngredients}
                      header="Add to Your Ingredients:"
                    />
                  </Row>

                </Col>
                <Col md="7">
                  <h2 className="centerHeader">
                    {`Your Ingredients (${ownages.length}) `}
                    <a href='/' onClick={this.toggleMultiYours} style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faList}/></a>
                  </h2>
                  {
                    ownages.length === 0
                    ?
                    <p className="normalText">
                      {`No ingredients added yet.  `}
                      <DefaultPrompt
                        basics={ingredients.basics}
                        defaultPop={defaultPop}
                        goAddDefaults={this.addIngredients}
                        goToggleDefaultPop={this.toggleDefaultPop}
                      />
                    </p>
                    :
                    null
                  }
                  <div className="userIngredientList yoursHide">
                    {
                      ownages.map((ownage, i) => (
                        <Button
                          key={ownage.id}
                          data-id={ownage.id}
                          className="ingredientButton" 
                          size="lg">
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
              <Row className="overallUserSection">
                <Col className="shoppingHide hidden" md="4">
                  <Row className="userPageSection">
                    <MultiSelectField
                      ingredients={ingredients}
                      value={fieldValueShop}
                      onSelectChange={this.updateFieldValueShop}
                      onSelectSubmit={this.addIngredientsShop}
                      header="Add to Shopping List:"
                    />
                  </Row>
                </Col>
                <Col md="7">
                  <h2 className="centerHeader">
                    {`Shopping List (${to_buys.length}) `}
                    <a href='/' onClick={this.toggleMultiShop} style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faShoppingCart}/></a>
                  </h2>
                  { to_buys.length === 0 ? <p  className="normalText">No ingredients added yet.</p> : null }
                  <div className="userIngredientList shoppingHide hidden">
                    {
                      to_buys.map((to_buy, i) => (
                        <Button key={to_buy.id} data-id={to_buy.id} className="ingredientButton toBuy" size="lg">
                          <small
                            data-id={to_buy.id}
                            onClick={this.xClickShop}
                            onMouseEnter={this.xEnter}
                            onMouseLeave={this.xLeave}
                          >
                            ⓧ{' '}
                          </small>
                          {to_buy.ingredient_name}
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
