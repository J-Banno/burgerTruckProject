import React from "react";
import "./style.css";
//Redux
import { useSelector } from "react-redux";
//Stripe

import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutForm() {
  //Redux store
  const { cart } = useSelector((state) => ({ ...state.cart }));

  //Format stripe
  const processItem = (item) => ({
    price_data: {
      currency: "eur",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.qty,
  });
  const order = cart.map(processItem);
  console.log(order);

  //Request
  const processPayment = async (e) => {
    try {
      let stripePromise = loadStripe(
        "pk_test_51JVXspIur9FHorho2S740fuKgE54fb0hav2QoEhYn5SgvtjwDZUD3m1APqFwx8D6fz0Oj2pGk6pN2y6eGnLcBUK6008ry3tZFL"
      );
      const stripe = await stripePromise;
      e.preventDefault();
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      };

      const response = await fetch("http://localhost:8000/checkout", options);
      const responseData = await response.json();
      console.log(responseData.id);
      return stripe.redirectToCheckout({ sessionId: responseData.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conatianerSubmitCheckout">
      <button className="submitCheckout" onClick={processPayment}>
        Valider le paiement
      </button>
    </div>
  );
}
