import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../../assets/images/Logo.png";
import Cart from "../../../assets/images/cart.png";
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../../../services/localStorage";
import * as actionTypes from "../../../lib/Redux/constants/userConstants";

function Navbar() {
  const dispatch = useDispatch();
  const role = getItem("roles");
  const token = getItem("token");

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
  //LogOut
  const handleLogout = () => {
    dispatch({
      type: actionTypes.RESET_USER,
    });
  };

  function adminRoute() {
    if (role?.includes("ROLE_ADMIN")) {
      return (
        <>
          <NavLink
            exact
            activeClassName="current"
            to="/dashboardAdmin"
            className="navbarLinkContainer"
          >
            <li className="navbarLinkItem ">Mes commandes</li>
          </NavLink>
          <li
            className="navbarLinkContainer"
            onClick={handleLogout}
            className="navbarLinkItem "
          >
            <button onClick={handleLogout} className="navbarBouttonLogout ">
              Déconnexion
            </button>
          </li>
        </>
      );
    }
  }

  function userRoute() {
    if (!role?.includes("ROLE_ADMIN") && role?.includes("ROLE_USER")) {
      return (
        <>
          <NavLink
            exact
            activeClassName="current"
            to="/history"
            className="navbarLinkContainer"
          >
            <li className="navbarLinkItem ">Mon compte</li>
          </NavLink>

          <li
            className="navbarLinkContainer"
            onClick={handleLogout}
            className="navbarLinkItem "
          >
            <button onClick={handleLogout} className="navbarBouttonLogout ">
              Déconnexion
            </button>
          </li>
        </>
      );
    }
  }

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

        {/********** Admin  **********/}
        {adminRoute()}

        {/********** User  **********/}
        {userRoute()}

        {!token && (
          <NavLink
            exact
            activeClassName="current"
            to="/Login"
            className="navbarLinkContainer"
          >
            <li className="navbarLinkItem ">Connexion</li>
          </NavLink>
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
