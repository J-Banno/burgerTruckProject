import React from "react";
import "./contact.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ContactBlock from "../../components/contactBlock/contactBlock";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <ContactBlock />
      <Footer />
    </div>
  );
}
