import React from "react";
import { useState } from "react";
import { getItem } from "../../../services/localStorage";

export default function ProductManagement() {
  const token = getItem("user");

  //Sate Message add product
  const [message, setMessage] = useState("");
  // State Product
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  // Update Product
  function handleProduct(e) {
    setProduct({ ...product, [e.target.id]: e.target.value });
  }

  //Request
  async function postProductData(e) {
    e.preventDefault();
    console.log(product);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      };
      console.log(options);
      // Waiting for the response from the api//
      const response = await fetch("http://localhost:8000/admin", options);
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success === true) {
        setMessage(responseData.message);
      } else {
        setMessage(responseData.message);
      }
    } catch ({ error }) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="addProductTitle">Ajouter un produit</h2>
      <form className="loginFomContainer" enctype="multipart/form-data">
        <label htmlFor="title" className="labelAddProduct">
          Dessignation
        </label>
        <input
          required
          type="text"
          id="title"
          value={product.title}
          onChange={handleProduct}
        />

        <label htmlFor="description" className="labelAddProduct">
          Description
        </label>
        <input
          required
          type="text"
          id="description"
          value={product.description}
          onChange={handleProduct}
        />

        <label htmlFor="description" className="labelAddProduct">
          Catégorie
        </label>
        <select
          required
          type="text"
          id="category"
          value={product.category}
          onChange={handleProduct}
        >
          <option value="burger">Burger</option>
          <option value="drinks">Boisson</option>
          <option value="desserts">Dessert</option>
        </select>

        <label htmlFor="price" className="labelAddProduct">
          Prix
        </label>
        <input
          required
          type="price"
          id="price"
          value={product.price}
          onChange={handleProduct}
        />

        <label htmlFor="image" className="labelAddProduct">
          Image produit
        </label>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          value={product.image}
          onChange={handleProduct}
        />
        <button className="btnAddProduct" onClick={postProductData}>
          Valider
        </button>
      </form>
    </>
  );
}
