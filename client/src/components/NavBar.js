import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">🥙</NavLink>
      {/* <NavLink exact to="/recipes/new">New Recipe</NavLink> */}
      <NavLink exact to="/recipes">View All Recipes</NavLink>
    </nav>
  )
}

export default NavBar;
