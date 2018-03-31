import React from 'react';
import { NavLink } from 'react-router-dom';
import RecipeSearch from './RecipeSearch'

function NavBar(props) {
    return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/recipes">View All Recipes</NavLink>
      <NavLink exact to={`/user/${props.user}`}>User Profile</NavLink>
      <RecipeSearch placeHoldText="Search a dish.." onSubmit={()=> {}} />
    </nav>
  )
}

export default NavBar;
