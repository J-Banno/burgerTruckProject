import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/cartConstants";
import "./cardProduct.css";
import { getItem } from "../../../services/localStorage";

export default function CardProduct(props) {
  //Sate Quantity
  const updateQuantity = (e) => {
    setQuantityProduct(Number(e.target.value));
  };

  const role = getItem("roles");
  const isAdmin = role?.includes("ROLE_ADMIN") ? true : false;
  const [quantityProduct, setQuantityProduct] = useState(1);

  //  console.log(isAdmin);

  //Cart State
  const { cart } = useSelector((state) => ({ ...state.cart }));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  //Message info client
  const addingInfo = useRef();
  let timerInfo;
  let display = true;

  //Add to cart
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();

    //Add redux
    const itemAdded = {
      ...props.data,
      quantity: quantityProduct,
    };

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: itemAdded,
    });

    //Message
    addingInfo.current.innerText = "Ajouté au panier";

    if (display) {
      display = false;
      timerInfo = setTimeout(() => {
        addingInfo.current.innerText = " ";
        display = true;
      }, 1000);
    }
  };

  return (
    <div key={props.data._id} className="cardProductContrainer">
      <div className="imageCardProductContainer">
        <img className="imageCardProduct" src={props.data.image} alt="Orange" />
      </div>

      <div className="cardBody">
        <div className="card-title">
          <h3 className="titleCard">{props.data.title}</h3>
        </div>

        <div className="cardDescription">
          <p>{props.data.description}</p>
        </div>
        <div className="priceCard">
          <p>{props.data.price} €</p>
        </div>
      </div>
      <form className="inputCardContainer">
        <div className="inputQuantity">
          <label className="quantityLabel" htmlFor="quantity">
            Quantités :
          </label>
          <input
            value={props.data.quantity}
            onChange={updateQuantity}
            type="number"
            min="1"
            max="10"
            className="selectProductCard"
          ></input>
        </div>
        <span ref={addingInfo} className="addingInfo"></span>
        <button onClick={addToCart} className="submitProductCard">
          Ajouter au panier
        </button>
        {isAdmin && (
          <button className="removeProductCard">Supprimer Produit</button>
        )}
      </form>
    </div>
  );
}
