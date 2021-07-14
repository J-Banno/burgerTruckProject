import React from "react";
import "./style.css";
import Navbar from "../../Layout/Header/navbar";
import Footer from "../../Layout/Footer/footer";
import Register from "./registerForm/registerForm";

export default function RegistrationPage() {
  return (
    <div>
      <Navbar />
      <section className="bagckroundLogin">
        <Register />
      </section>
      <Footer />
    </div>
  );
}
