import React from "react";
import "./registerForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Config } from "../../../config/config";

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

    try {
      const response = await fetch(Config.apiUrl + "registration", options);
      const responseData = await response.json();
      if (responseData.success === true) {
        localStorage.setItem("user", responseData.token);
        history.push("/");
      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Update users //
  function handleInput(e) {
    setRegistration({ ...newRegistration, [e.target.name]: e.target.value });
  }

  return (
    <form className="fromRegistrationContainer" onSubmit={postloginData}>
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
            placeholder="Pr??nom"
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
            placeholder="Num??ro de t??l??phone"
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
          />

          <p className="registrationRedirection">
            D??j?? membre
            <Link className="registrationRedirectionLink" to="/Login">
              Se Connecter
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
