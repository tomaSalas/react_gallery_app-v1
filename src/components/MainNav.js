import React from "react";
import {
    Route,
    NavLink
  } from "react-router-dom";

  //import data
import PhotoContainer from "./PhotoContainer";

const MainNav = (props) => (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/cats">Cats</NavLink></li>
                <li><NavLink to="/dogs">Dogs</NavLink></li>
                <li><NavLink to="/computers">Computers</NavLink></li>
            </ul>
       </nav>
    );

export default MainNav;