import React from 'react';
import { NavLink } from 'react-router-dom';
import RecipeSearch from './RecipeSearch'

function NavBar(props) {
    return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/ingredients">Your Ingredients</NavLink>
      <NavLink exact to="/recipes">View Recipes</NavLink>
      <div id="navSearchBar">
        <RecipeSearch placeHoldText="Search a dish.." onSubmit={()=> {}} />
      </div>
    </nav>
  )
}

export default NavBar;
