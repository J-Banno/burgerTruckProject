import React from "react";
import "./style.css";
import Navbar from "../../Layout/Header/navbar";
import Footer from "../../Layout/Footer/footer";
import Login from "./loginForm/loginForm";

export default function LoginPage() {
  return (
    <div>
      <Navbar />

      <div className="bagckroundLogin">
        <Login />
      </div>

      <Footer />
    </div>
  );
}
