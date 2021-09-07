import React from "react";
import Auth from "../../../lib/Contexts/auth";
import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../../assets/images/Logo.png";
import Cart from "../../../assets/images/cart.png";
import { useSelector } from "react-redux";
import { logout } from "../../../services/authApi";

function Navbar() {
  //Private route
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  //Notification cart quantity :
  const shoppingCart = useSelector((state) => state);

  let totalItems = 0;
  for (const item of shoppingCart.cart.cart) {
    totalItems += item.qty;
  }
  //Context User
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  //LogOut
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
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
          <li className="navbarLinkItem">Accueil</li>
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

        {/********** User  **********/}

        {(!isAuthenticated && (
          <>
            {/***** Login *****/}
            <NavLink
              exact
              activeClassName="current"
              to="/Login"
              className="navbarLinkContainer"
            >
              <li className="navbarLinkItem ">Connexion</li>
            </NavLink>
          </>
        )) || (
          <>
            {/***** History *****/}
            <NavLink
              exact
              activeClassName="current"
              to="/history"
              className="navbarLinkContainer"
            >
              <li className="navbarLinkItem ">Mon compte</li>
            </NavLink>

            {/***** Logout *****/}

            <li
              className="navbarLinkContainer"
              activeClassName="current"
              onClick={handleLogout}
              className="navbarLinkItem "
            >
              <button onClick={handleLogout} className="navbarLinkItem ">
                Déconnexion
              </button>
            </li>
          </>
        )}

        <NavLink
          exact
          activeClassName="current"
          to="/cart"
          className="navbarLinkContainer navbarCartContainer"
        >
          <div className="floatingCart">
            <div className="cartContainer">
              <img
                src={Cart}
                alt="cart"
                className="navbarLinkItem navbarCart"
              />
              <span className="notif">{totalItems}</span>
            </div>
          </div>
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
