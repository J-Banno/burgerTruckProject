import React, { useState, useEffect } from "react";
import "./order.css";
import Footer from "../../components/Layout/Footer/footer";
import Header from "../../components/Layout/Header/navbar";
import CardProduct from "../../components/Order/cardProduct/cardProduct";
import ProductManagement from "../../components/DahsboardAdmin/ProductManagement/index";

//Services
import { getItem } from "../../services/localStorage";

export default function Order() {
  const [products, setProducts] = useState([]);
  const role = getItem("roles");
  const isAdmin = role?.includes("ROLE_ADMIN") ? true : false;
  useEffect(() => {
    async function getProducts() {
      try {
        const options = {
          method: "GET",
        };
        const response = await fetch("http://localhost:8000/products", options);
        const productsData = await response.json();

        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function displayBurger() {
    return products
      .filter((products) => products?.category?.includes("burger"))
      .map(function (products) {
        return <CardProduct key={products._id} data={products} />;
      });
  }

  function displayDrinks() {
    return products
      .filter((products) => products?.category?.includes("drinks"))
      .map(function (products) {
        return <CardProduct key={products._id} data={products} />;
      });
  }

  function displayDesserts() {
    return products
      .filter((products) => products?.category?.includes("desserts"))
      .map(function (products) {
        return <CardProduct key={products._id} data={products} />;
      });
  }
  return (
    <div className="Content">
      <Header />

      {isAdmin && <ProductManagement />}
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
