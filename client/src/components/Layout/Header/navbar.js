import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../../assets/images/Logo.png";
import Cart from "../../../assets/images/cart.png";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`navbar ${showLinks ? "showNav" : "hideNav"}`}>
      {/***** Logo *****/}
      <NavLink exact to="/" className="navbarLogoContainer">
        <img src={Logo} alt="logo" className="navbarLogo" />
      </NavLink>
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
          <li className="navbarLinkItem ">Connexion</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="current"
          to="/cart"
          className="navbarLinkContainer navbarCartContainer"
        >
          <img src={Cart} alt="cart" className="navbarLinkItem navbarCart" />
        </NavLink>
      </ul>

      {/***** Menu Burger *****/}
      <button className="navbarBurger" onClick={handleShowLinks}>
        <span className="burgerLine"></span>
      </button>
    </nav>
  );
}
export default Navbar;
