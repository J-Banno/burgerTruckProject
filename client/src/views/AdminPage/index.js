import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import ProductManagement from "../../components/DahsboardAdmin/ProductManagement/index";

export default function CheckoutForm() {
  return (
    <>
      <Navbar />
      <ProductManagement />
      <Footer />
    </>
  );
}
