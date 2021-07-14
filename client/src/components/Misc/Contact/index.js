import React from "react";
import "./style.css";
import Navbar from "../../../components/Layout/Header/navbar";
import Footer from "../../../components/Layout/Footer/footer";
import ContactBlock from "./contactBlock/contactBlock";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <ContactBlock />
      <Footer />
    </div>
  );
}
