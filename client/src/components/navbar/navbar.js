import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/images/Logo.png";
import Cart from "../../assets/images/cart.png";

function Navbar() {
  return (
    <nav className="navbar">
      {/***** Logo *****/}
      <div className="navbarLogoContainer">
        <img src={Logo} alt="logo" className="navbarLogo" />
      </div>
      <ul className="navbarLink">
        {/***** Home *****/}
        <NavLink
          exact
          activeClassName="current"
          to="/"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem">Acceuil</li>
        </NavLink>
        {/***** Order *****/}
        <NavLink
          exact
          activeClassName="current"
          to="/Order"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem">Notre Carte</li>
        </NavLink>
        {/***** Contact *****/}
        <NavLink
          exact
          activeClassName="current"
          to="/Contact"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem">Contact</li>
        </NavLink>
        {/***** Login *****/}
        <NavLink
          exact
          activeClassName="current"
          to="/Login"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem ">Connection</li>
        </NavLink>
      </ul>
      <NavLink
        exact
        activeClassName="current"
        to="/"
        className="navbarCartContainer"
      >
        <img src={Cart} alt="cart" className="navbarCart" />
      </NavLink>
    </nav>
  );
}
export default Navbar;
