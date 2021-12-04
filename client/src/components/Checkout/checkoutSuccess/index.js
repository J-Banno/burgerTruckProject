import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeItem } from "../../../services/localStorage";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/cartConstants";
import { getItem } from "../../../services/localStorage";
import jwt_decode from "jwt-decode";
import { Config } from "../../../config/config";

export default function CheckoutSuccess() {
  //Sate
  const cart = useSelector((state) => state);
  const userToken = getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();

  //Token
  const token = userToken;
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    postOrderData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Add order post
  async function postOrderData() {
    const options = {
      method: "POST",
      body: JSON.stringify({ cart, decodedToken }),
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };

    // Waiting for the response from the api//
    try {
      const response = await fetch(Config.apiUrl + "order", options);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.CART_RESET,
        });
        setTimeout(() => history.push("/"), 3000);
        removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="successTitle">Merci pour votre commande!</h1>
      <section>
        <p>Votre paiement a bien était pris compte, merci.</p>
      </section>
    </>
  );
}
