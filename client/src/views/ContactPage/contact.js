import React from "react";
import "./contact.css";
import Navbar from "../../components/Layout/Header/navbar";
import Footer from "../../components/Layout/Footer/footer";

export default function Contact() {
  return (
    <div>
      <Navbar />

      <section className="contactContainer">
        <h1 className="contactTitle">Restons en contact</h1>
        <div className="contactBoxContainer">
          <div className="contactContent">
            <h2 className="blockTitle">Une Question ?</h2>
            <p className="textContact">
              Une commande ? Des suggestions ? <br />
              N'hésitez pas à nous contacter, nous vous répondrons dans les
              meilleurs délais. <br />
              <br />
              <span className="contactSpan">Mail : </span>
              burgertruck@gmail.com <br />
              <span className="contactSpan"> Télphone : </span>04-94-56-78-21
            </p>
          </div>
          <div className="contactContent">
            <h2 className="blockTitle">Ou nous trouver ?</h2>
            <p className="textContact">
              <span className="contactSpan">Adresse : </span>64 Place des
              Oursinières Le Pradet
            </p>
            <iframe
              className="adressCompagny"
              title="Adress BurgerTruck"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.937054393264!2d6.018300615468554!3d43.084818679144945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c91ed75a911315%3A0xd43c7fde33472c5d!2s64%20Place%20des%20Oursini%C3%A8res%2C%2083220%20Le%20Pradet!5e0!3m2!1sfr!2sfr!4v1626278502753!5m2!1sfr!2sfr"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
