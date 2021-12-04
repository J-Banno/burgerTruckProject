import React from "react";
import "./loginForm.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/userConstants";
import { addItem } from "../../../services/localStorage";
import { Config } from "../../../config/config";

export default function LoginForm() {
  const dispatch = useDispatch();
  //Gestion error
  const [message, setMessage] = useState("");
  const history = useHistory();
  //Sate
  let [newConnection, setConnection] = useState({
    mail: "",
    password: "",
  });

  // Takes UserLogin data //
  async function postloginData(e) {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newConnection),
        headers: { "content-type": "application/json" },
      };
      // Waiting for the response from the api//
      const response = await fetch(Config.apiUrl + "login", options);
      const responseData = await response.json();

      if (responseData.success === true) {
        addItem("token", responseData.token);
        addItem("roles", responseData.userConnect?.roles);
        addItem("userId", responseData.userConnect?.userId);
        const userConnect = responseData.userConnect;

        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          payload: userConnect,
        });

        history.replace("/order");
        window.location.reload(false);
      } else {
        setMessage(responseData.message);
      }
    } catch ({ response }) {
      console.log(response);
    }
  }

  // Update users //
  function handleLogin(e) {
    setConnection({ ...newConnection, [e.target.name]: e.target.value });
  }

  return (
    <form className="loginFomContainer" onSubmit={postloginData}>
      <div className="inputFormContainer">
        <h2 className="titleForm">S'identifier</h2>

        <input
          type="email"
          className="loginInput"
          name="mail"
          required
          onChange={handleLogin}
          value={newConnection.mail}
          placeholder="Entrez votre email"
        />
        <input
          className="loginInput"
          type="password"
          name="password"
          autoComplete="off"
          required
          onChange={handleLogin}
          value={newConnection.password}
          placeholder="Entrez votre mot de passe"
        />
        {/*Error*/}
        <p>{message}</p>
        <input className="loginInput" type="submit" value="SE CONNECTER" />
        <p className="loginRedirection">
          Première visite
          <Link className="loginRedirectionLink" to="/register">
            S'inscrire
          </Link>
        </p>
      </div>
    </form>
  );
}
