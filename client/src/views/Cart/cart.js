import React from "react";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import * as actionTypes from "../../lib/Redux/constants/cartConstants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutFrom from "../../components/Checkout/CheckoutForm/checkoutForm.js";
import "./cart.css";
//Icon
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const { cart } = useSelector((state) => ({ ...state.cart }));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="cartTitle">D??tail de votre panier</h2>
          <table className="tableCart">
            <thead className="tableCartBody">
              <tr className="tableCartHeader">
                <th width="100"></th>
                <th width="200">Produit</th>
                <th width="150">Prix</th>
                <th width="150">Quantit??s</th>
                <th width="200">Total</th>
              </tr>
            </thead>
            <tbody className="containerItemCartProduct">
              {cart.map((item) => (
                <tr className="itemCartProduct" key={item.name}>
                  <td data-label="icon" width="100">
                    <DeleteIcon
                      fontSize="small"
                      onClick={handleRemove}
                      className="iconCartProduct"
                    />
                  </td>
                  <td data-label="name" width="200">
                    {item.name}
                  </td>
                  <td data-label="price" width="150">
                    {item.price.toFixed(2)} ???{" "}
                  </td>
                  <td data-label="quantity" width="150">
                    <div className="quantityCartInput">
                      <input
                        onChange={(e) => handleChange(e, item.ref)}
                        type="number"
                        min="1"
                        max="10"
                        id="quantityInput"
                        value={item.qty}
                      />
                    </div>
                  </td>
                  <td data-label="total" width="200">
                    {item.total.toFixed(2)} ???
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totalCartContainer">
            <p className="totalPrice">Total : {totalPrice.toFixed(2)} ???</p>
          </div>
          <CheckoutFrom />
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="cartTitle cartTitleNull">Panier vide</h2>
        </div>

        <Footer />
      </>
    );
  }
}
