import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/images/Logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar--logo-holder">
        <img src={Logo} alt="logo" className="navbarLogo" />
      </div>
      <ul className="navbarLink">
        <NavLink exact activeClassName="current" to="/Home">
          <li className="navbarLinkItem">Home</li>
        </NavLink>

        <NavLink exact activeClassName="current" to="/Order">
          <li className="navbarLinkItem">Notre Carte</li>
        </NavLink>

        <NavLink exact activeClassName="current" to="/Contact">
          <li className="navbarLinkItem">Contact</li>
        </NavLink>
      </ul>
    </nav>
  );
}
export default Navbar;
