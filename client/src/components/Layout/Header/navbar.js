import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../../assets/images/Logo.png";
import Cart from "../../../assets/images/cart.png";
import { useSelector, useDispatch } from "react-redux";
import { isUser, isAdmin } from "../../../services/authApi";
import * as actionTypes from "../../../lib/Redux/constants/userConstants";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.user }));
  const userConnect = user[0];
  const userRole = isUser(userConnect);
  const adminRole = isAdmin(userConnect);

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
    if (adminRole === true) {
      return (
        <NavLink
          exact
          activeClassName="current"
          to="/dashboardAdmin"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem ">Produits</li>
        </NavLink>
      );
    }
  }

  function userRoute() {
    if (userRole === true) {
      return (
        <>
          <NavLink
            exact
            activeClassName="current"
            to="/history"
            className="navbarLinkContainer"
          >
            {adminRole === true ? (
              <li className="navbarLinkItem ">Commandes</li>
            ) : (
              <li className="navbarLinkItem ">Mon compte</li>
            )}
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
    } else {
      return (
        <NavLink
          exact
          activeClassName="current"
          to="/Login"
          className="navbarLinkContainer"
        >
          <li className="navbarLinkItem ">Connexion</li>
        </NavLink>
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
