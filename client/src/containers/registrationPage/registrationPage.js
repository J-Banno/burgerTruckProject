import React from "react";
import "./registrationPage.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Registration from "../../components/registrationForm/registrationForm";

export default function RegistrationPage() {
  return (
    <div>
      <Navbar />
      <section className="bagckroundLogin">
        <Registration />
      </section>
      <Footer />
    </div>
  );
}
