import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeItem } from "../../../services/localStorage";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/cartConstants";

export default function CheckoutSuccess() {
  //Sate cart
  const cart = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    removeItem("cart");
    dispatch({
      type: actionTypes.CART_RESET,
    });
    redirectHome();
  }, []);

  const redirectHome = () => {
    setTimeout(() => history.push("/"), 3000);
  };

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
