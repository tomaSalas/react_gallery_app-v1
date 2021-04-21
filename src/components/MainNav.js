import React from "react";
import {
    Route,
    NavLink
  } from "react-router-dom";

  //import data
import App from "../App"

const MainNav = () => (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/h">Cats</NavLink></li>
                <li><NavLink to="/n">Dogs</NavLink></li>
                <li><NavLink to="/m">Computers</NavLink></li>
            </ul>
            <Route path="/h" component={App}  />
            <Route path="/n" component={App}  />
            <Route path="/m" component={App}  />
       </nav>
    );

export default MainNav;