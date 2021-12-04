import React, { useState, useEffect } from "react";
import "./order.css";
import Footer from "../../components/Layout/Footer/footer";
import Header from "../../components/Layout/Header/navbar";
import CardProduct from "../../components/Order/cardProduct/cardProduct";
import ProductManagement from "../../components/DahsboardAdmin/ProductManagement/index";

//Services
import { getItem } from "../../services/localStorage";
import { Config } from "../../config/config";

export default function Order() {
  const [products, setProducts] = useState(null);
  const role = getItem("roles");
  const isAdmin = role?.includes("ROLE_ADMIN") ? true : false;
  useEffect(() => {
    async function getProducts() {
      const options = {
        method: "GET",
      };
      try {
        const response = await fetch(Config.apiUrl + "products", options);
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function displayBurger() {
    if (products) {
      return products
        .filter((products) => products.category?.includes("burger"))
        .map(function (products) {
          return <CardProduct key={products._id} data={products} />;
        });
    }
  }

  function displayDrinks() {
    if (products) {
      return products
        .filter((products) => products.category?.includes("drinks"))
        .map(function (products) {
          return <CardProduct key={products._id} data={products} />;
        });
    }
  }

  function displayDesserts() {
    if (products) {
      return products
        .filter((products) => products.category?.includes("desserts"))
        .map(function (products) {
          return <CardProduct key={products._id} data={products} />;
        });
    }
  }

  return (
    <div className="Content">
      <Header />
      {isAdmin && <ProductManagement />}
      {products ? (
        <>
          <section>
            <h2 className="titleProductCategory">
              {products ? "Nos Burger : " : ""}
            </h2>
            <div className="blockCardProducts">{displayBurger()}</div>
          </section>
          <section>
            <h2 className="titleProductCategory">
              {products ? "Nos Boissons : " : ""}
            </h2>
            <div className="blockCardProducts">{displayDrinks()}</div>
          </section>
          <section>
            <h2 className="titleProductCategory">
              {products ? "Nos Desserts : " : ""}
            </h2>
            <div className="blockCardProducts">{displayDesserts()}</div>
          </section>
        </>
      ) : (
        <h1
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Burger Truck
        </h1>
      )}

      <Footer />
    </div>
  );
}
