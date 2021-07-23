import React, { useState, useEffect } from "react";
import "./order.css";
import Footer from "../Layout/Footer/footer";
import Header from "../Layout/Header/navbar";
import CardProduct from "./cardProduct/cardProduct";

export default function Order() {
  const [products, setProducts] = useState([]);
  useEffect(getProducts, []);

  async function getProducts() {
    const options = {
      method: "GET",
    };

    const response = await fetch("http://localhost:8000/products", options);
    const productsData = await response.json();

    setProducts(productsData);
    console.log(productsData);
  }

  function displayBurger() {
    return products
      .filter((products) => products.category.includes("burger"))
      .map(function (products) {
        return <CardProduct data={products} />;
      });
  }

  function displayDrinks() {
    return products
      .filter((products) => products.category.includes("drinks"))
      .map(function (products) {
        return <CardProduct data={products} />;
      });
  }

  function displayDesserts() {
    return products
      .filter((products) => products.category.includes("desserts"))
      .map(function (products) {
        return <CardProduct data={products} />;
      });
  }

  return (
    <div className="Content">
      <Header />
      <section>
        <h2 className="titleProductCategory">Burger : </h2>
        <div className="blockCardProducts">{displayBurger()}</div>
      </section>

      <Footer />
    </div>
  );
}
