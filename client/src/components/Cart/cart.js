import React from "react";
import Navbar from "../Layout/Header/navbar";
import Footer from "../Layout/Footer/footer";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <table>
        <tr>
          <th width="200">Produit</th>
          <th width="150">Prix</th>
          <th width="150">Quantités</th>
          <th width="200">Total</th>
        </tr>
      </table>
      <Footer />
    </>
  );
}
