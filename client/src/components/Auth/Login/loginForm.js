import React from "react";
import "./loginForm.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../lib/Redux/constants/userConstants";
import Auth from "../../../lib/Contexts/auth";
import { addItem } from "../../../services/localStorage";
export default function LoginForm() {
  //Cart State
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();

  //Context
  const { isAuthenticated } = useContext(Auth);

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
      const response = await fetch("http://localhost:8000/login", options);
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success === true) {
        const userConnect = responseData.userConnect[0];
        console.log(userConnect.roles);
        Auth._currentValue.isAuthenticated = true;
        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          payload: userConnect,
        });
        addItem("user", responseData.token);

        history.replace("/order");
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
    <form className="loginFomContainer" action="" method="POST">
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
        <input
          className="loginInput"
          type="submit"
          value="SE CONNECTER"
          onClick={postloginData}
        />
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
