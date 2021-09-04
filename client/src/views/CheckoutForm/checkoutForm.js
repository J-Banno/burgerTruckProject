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

export default function CheckoutForm() {
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
          <button className="submitCheckout" type="submit">
            Valider le paiement
          </button>
        </form>
      </Elements>
      <Footer />
    </>
  );
}
