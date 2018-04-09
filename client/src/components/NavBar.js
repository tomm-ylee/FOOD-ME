import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faLemon from '@fortawesome/fontawesome-free-solid/faLemon'
import faStickyNote from '@fortawesome/fontawesome-free-solid/faStickyNote'
import faUtensils from '@fortawesome/fontawesome-free-solid/faUtensils'

import RecipeSearch from './RecipeSearch'

function NavBar(props) {
    return (
    <nav className="NavBar">
      <NavLink exact to="/" style={{ textDecoration: 'none' }}><div id="navTitle" >KITCHEN SLATE</div></NavLink>
      <NavLink exact to="/ingredients" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faLemon} size="2x" /></NavLink>
      <NavLink exact to="/saved" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faStickyNote} size="2x" /></NavLink>
      <NavLink exact to="/recipes" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faUtensils} size="2x" /></NavLink>
      <div id="navSearchBar">
        <RecipeSearch placeHoldText="Search a dish.." onSubmit={()=> {}} />
      </div>
    </nav>
  )
}

export default NavBar;
