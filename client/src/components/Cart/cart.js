import React from "react";
import Navbar from "../Layout/Header/navbar";
import Footer from "../Layout/Footer/footer";
import * as actionTypes from "../../Redux/constants/cartConstants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";

export default function CartPage() {
  const { cart } = useSelector((state) => ({ ...state.cart }));
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  const dispatch = useDispatch();

  //Change quantity product
  const storeState = useSelector((state) => state);
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

      <Footer />
    </>
  );
}
