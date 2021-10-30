import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import * as actionTypes from "../../lib/Redux/constants/cartConstants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutFrom from "../../components/Checkout/CheckoutForm/checkoutForm.js";
import "./cart.css";

export default function CartPage() {
  const history = useHistory();

  const { cart } = useSelector((state) => ({ ...state.cart }));
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  const dispatch = useDispatch();
  const storeState = useSelector((state) => state);

  //Remove Pruduct
  const handleRemove = (event, id) => {
    const indexItem = storeState.cart.cart.findIndex((obj) => obj.ref === id);

    const objRemove = {
      ...storeState.cart.cart[indexItem],
    };
    dispatch({
      type: actionTypes.REMOVE_TO_CART,
      payload: objRemove,
    });
  };

  //Change quantity product

  const handleChange = (event, id) => {
    const indexItem = storeState.cart.cart.findIndex((obj) => obj.ref === id);

    const objUpdated = {
      ...storeState.cart.cart[indexItem],
      qty: Number(event.target.value),
      total: Number(event.target.value * storeState.cart.cart[indexItem].price),
    };

    dispatch({
      type: actionTypes.UPDATE_ITEM,
      payload: objUpdated,
    });
  };

  //Total price cart
  let totalPrice = 0;
  if (storeState.cart.cart.length !== 0) {
    for (const item of storeState.cart.cart) {
      const itemPrice = item.price * item.qty;
      totalPrice += itemPrice;
    }
  }
  if (storeState.cart.cart.length !== 0) {
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
              <th width="200">
                {item.name}
                <button onClick={handleRemove}>X</button>
              </th>
              <th width="150">{item.price.toFixed(2)} € </th>
              <th width="150">
                <div className="quantityCartInput">
                  <label htmlFor="quantityInput">Quantité</label>
                  <input
                    onChange={(e) => handleChange(e, item.ref)}
                    type="number"
                    min="1"
                    max="10"
                    id="quantityInput"
                    value={item.qty}
                  />
                </div>
              </th>
              <th width="200">{item.total} €</th>
            </tr>
          ))}
        </table>
        <div className="totalCartContainer">
          <p className="totalPrice">Total : {totalPrice.toFixed(2)} €</p>
        </div>
        <CheckoutFrom />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <h2 className="cartTitle cartTitleNull">Panier vide</h2>

        <Footer />
      </>
    );
  }
}
