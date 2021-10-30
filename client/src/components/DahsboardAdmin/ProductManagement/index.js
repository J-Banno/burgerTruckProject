import React from "react";
import { useState } from "react";
import { getItem } from "../../../services/localStorage";
import { regex } from "../../../services/utils";

export default function ProductManagement() {
  const token = getItem("user");

  //Sate Message add product
  const [message, setMessage] = useState();
  //State Image
  const [imageProduct, setImageProduct] = useState(null);
  console.log(imageProduct);
  // State Product
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "burger",
  });

  // Update Product
  function handleProduct(e) {
    setProduct({ ...product, [e.target.id]: e.target.value });
  }

  //Upload Image
  function fileSelectHandler(e) {
    setImageProduct({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
  }

  //Request
  async function postProductData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageProduct.pictureAsFile);
    formData.append("title", product.title);
    formData.append(
      "path",
      `${regex(product.category)}_${regex(
        product.title
      )}${imageProduct.pictureAsFile.type.replace("image/", ".")}`
    );

    console.log(imageProduct.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    try {
      const options = {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      };

      // Waiting for the response from the api//
      const response = await fetch("http://localhost:8000/admin", options);
      const responseData = await response.json();

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
      <form enctype="multipart/form-data" className="loginFomContainer">
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
        <input type="file" id="image" required onChange={fileSelectHandler} />
        <button className="btnAddProduct" onClick={postProductData}>
          Valider
        </button>
      </form>
    </>
  );
}
