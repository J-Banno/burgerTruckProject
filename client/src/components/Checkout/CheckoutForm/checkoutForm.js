import React, { useState } from "react";
import "./style.css";
//Redux
import { useSelector } from "react-redux";
//Services
import { getItem } from "../../../services/localStorage";
import { Config } from "../../../config/config";
//Stripe
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutForm() {
  //Redux store
  const { cart } = useSelector((state) => ({ ...state.cart }));
  const [message, setMessage] = useState(null);

  //Format stripe
  const processItem = (item) => ({
    price_data: {
      currency: "eur",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.qty,
  });

  //Constant
  const order = cart.map(processItem);
  const token = getItem("token");

  //Request
  const processPayment = async (e) => {
    if (token != null) {
      try {
        let stripePromise = loadStripe(
          "pk_test_51JVXspIur9FHorho2S740fuKgE54fb0hav2QoEhYn5SgvtjwDZUD3m1APqFwx8D6fz0Oj2pGk6pN2y6eGnLcBUK6008ry3tZFL"
        );
        const stripe = await stripePromise;
        e.preventDefault();
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(Config.apiUrl + "checkout", options);
        const responseData = await response.json();

        return stripe.redirectToCheckout({ sessionId: responseData.id });
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("Veuillez vous identifier pour valider votre panier.");
    }
  };

  return (
    <div className="conatianerSubmitCheckout">
      <span>{message}</span>
      <button className="submitCheckout" onClick={processPayment}>
        Valider le paiement
      </button>
    </div>
  );
}
