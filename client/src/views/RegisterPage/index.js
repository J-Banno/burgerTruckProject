import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import Register from "../../components/Auth/Register/registerForm";

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
