import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  const { count } = useSelector((state) => ({
    ...state.counterReducer,
  }));

  const addToCart = (e) => {
    e.preventDefault();
    const itemAdded = {
      ...setProducts,
      quantity: count,
    };
    dispatch({
      type: "ADD_TO_CART",
      payload: itemAdded,
    });
  };
  return (
    <div className="Content">
      <Header />
      <section>
        <h2 className="titleProductCategory">Nos Burger : </h2>
        <div className="blockCardProducts">{displayBurger()}</div>
      </section>
      <section>
        <h2 className="titleProductCategory">Nos Boissons : </h2>
        <div className="blockCardProducts">{displayDrinks()}</div>
      </section>
      <section>
        <h2 className="titleProductCategory">Nos Desserts : </h2>
        <div className="blockCardProducts">{displayDesserts()}</div>
      </section>
      <Footer />
    </div>
  );
}
