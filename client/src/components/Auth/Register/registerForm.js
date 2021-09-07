import React from "react";
import "./registerForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function RegistrationForm(props) {
  const history = useHistory();
  let [newRegistration, setRegistration] = useState({
    mail: "",
    tel: "",
    password: "",
    passwordConfirm: "",
    lastName: "",
    firstName: "",
    adress: "",
    city: "",
  });
  //Gestion error
  const [message, setMessage] = useState("");
  // Takes UserLogin data //
  async function postloginData(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(newRegistration),
      headers: { "content-type": "application/json" },
    };

    // Waiting for the response from the api//

    const response = await fetch("http://localhost:8000/registration", options);
    console.log(response);
    const responseData = await response.json();
    if (responseData.success === true) {
      localStorage.setItem("user", responseData.token);
      history.push("/");
    }
    console.log(responseData);
  }

  // Update users //
  function handleInput(e) {
    setRegistration({ ...newRegistration, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  return (
    <form className="fromRegistrationContainer" method="POST">
      <div className="inputFormRegistrationContainer">
        <h2 className="titleFormRegistration">S'inscrire</h2>

        {/* Identity */}
        <div className="inputTwoColumns">
          <input
            type="text"
            className="inputRegistration"
            name="lastName"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.lastName}
            placeholder="Nom"
          />
          <input
            type="text"
            className="inputRegistration"
            name="firstName"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.firstName}
            placeholder="Prénom"
          />
        </div>
        {/* Contact information */}
        <div className="inputTwoColumns">
          <input
            type="email"
            className="inputRegistration"
            name="mail"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.mail}
            placeholder="Email"
          />

          <input
            type="tel"
            className="inputRegistration"
            name="tel"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.tel}
            placeholder="Numéro de téléphone"
          />
        </div>
        {/* Adress */}
        <div>
          <input
            className="inputRegistration"
            type="text"
            name="adress"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.adress}
            placeholder="Adresse"
          />
          <input
            className="inputRegistration"
            type="text"
            name="city"
            autoComplete="on"
            required
            onChange={handleInput}
            value={newRegistration.city}
            placeholder="Ville"
          />
          {/* Password */}
          <input
            className="inputRegistration"
            type="password"
            name="password"
            autoComplete="off"
            required
            onChange={handleInput}
            value={newRegistration.password}
            placeholder="Mot de passe"
          />
          <input
            className="inputRegistration"
            type="password"
            name="passwordConfirm"
            autoComplete="off"
            required
            onChange={handleInput}
            value={newRegistration.passwordConfirm}
            placeholder="Confirmez votre mot de passe"
          />
          {/*Error*/}
          <p>{message}</p>
          {/* Button */}
          <input
            className="inputRegistration"
            type="submit"
            value="S'INSCRIRE"
            onClick={postloginData}
          />

          <p className="registrationRedirection">
            Déjà membre
            <Link className="registrationRedirectionLink" to="/Login">
              Se Connecter
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
