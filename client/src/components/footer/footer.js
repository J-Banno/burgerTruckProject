import React from "react";
import "./footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="followContainer">
        <h2 className="titleFooter">NOUS SUIVRE</h2>
        <div className="containerFooterIcon">
          <FaFacebook className="footerIcon" />
          <FaTwitter className="footerIcon" />
          <FaInstagram className="footerIcon" />
        </div>
      </div>
      <p className="copyright">© 2021 Burger Truck</p>
    </footer>
  );
}
