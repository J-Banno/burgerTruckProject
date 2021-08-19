import React from "react";
import Navbar from "../Layout/Header/navbar";
import Footer from "../Layout/Footer/footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./cart.css";

export default function CartPage() {
  const { cart } = useSelector((state) => ({ ...state.cart }));
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="cartTitle">Détail de votre panier</h2>
      <table className="tableCart">
        <tr className="tableCartHeader">
          <th width="200">Produit</th>
          <th width="150">Prix</th>
          <th width="150">Quantités</th>

          <th width="200">Total</th>
        </tr>
        {cart.map((item) => (
          <tr className="itemCartProduct" key={cart._id} {...cart}>
            <th width="200">{item.name}</th>
            <th width="150">{item.price} €</th>
            <th width="150">{item.qty}</th>
            <th width="200">{item.total} €</th>
          </tr>
        ))}
      </table>

      <Footer />
    </>
  );
}
