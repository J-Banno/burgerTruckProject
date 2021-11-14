import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeItem } from "../../../services/localStorage";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/cartConstants";
import { getItem } from "../../../services/localStorage";
import jwt_decode from "jwt-decode";

export default function CheckoutSuccess() {
  //Sate
  const cart = useSelector((state) => state);
  const userToken = getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    postOrderData();
    removeItem("cart");
    dispatch({
      type: actionTypes.CART_RESET,
    });
    redirectHome();
  }, []);

  const redirectHome = () => {
    setTimeout(() => history.push("/"), 3000);
  };

  //Token
  const token = userToken;
  const decodedToken = jwt_decode(token);

  //Add order post
  async function postOrderData() {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ cart, decodedToken }),
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };

      // Waiting for the response from the api//
      const response = await fetch("http://localhost:8000/order", options);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="successTitle">Merci pour votre commande!</h1>
      <section>
        <p>
          We appreciate your business! If you have any questions, please email
        </p>
      </section>
    </>
  );
}
