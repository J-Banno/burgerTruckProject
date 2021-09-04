import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import Login from "../../components/Auth/Login/loginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <div className="bagckroundLogin">
        <Login />
      </div>

      <Footer />
    </>
  );
}
