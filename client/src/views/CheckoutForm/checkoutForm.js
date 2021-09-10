import React from "react";
import "./style.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
//Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/Stripe/elementsProvider";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const processPayment = async (e, order) => {
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
    console.dir(responseData);
  };

  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <h2 className="checkoutTitle">Finaliser votre commande</h2>
        <form className="containerCheckOut">
          <h3 className="cardCheckoutTitle">Saisissez votre carte bancaire</h3>
          <label className="labelCardFrom" htmlFor="cardNumber">
            Numéro de carte
          </label>
          <CardNumberElement
            id="cardNumber"
            className="cardInfo"
            options={{
              hidePostalCode: true,
            }}
          />
          <label className="labelCardFrom" htmlFor="cardExpire">
            Date d'expiration
          </label>
          <CardExpiryElement
            id="cardExpire"
            className="cardInfo"
            options={{
              hidePostalCode: true,
            }}
          />
          <label className="labelCardFrom" htmlFor="cardCvc">
            Code CVC
          </label>
          <CardCvcElement
            id="cardCvc"
            className="cardInfo"
            options={{
              hidePostalCode: true,
            }}
          />
          <button className="submitCheckout" onClick={processPayment}>
            Valider le paiement
          </button>
        </form>
      </Elements>
      <Footer />
    </>
  );
}
