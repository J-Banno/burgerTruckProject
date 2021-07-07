import React from "react";
import "./loginPage.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Login from "../../components/loginForm/loginForm";

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
