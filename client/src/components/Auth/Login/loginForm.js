import React from "react";
import "./loginForm.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../../../lib/Contexts/auth";
import { addItem } from "../../../services/localStorage";
export default function LoginForm() {
  //Context
  const { isAuthenticated } = useContext(Auth);
  console.log("Login : " + isAuthenticated);

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
      if (responseData.success === true) {
        addItem("token", responseData.token);
        window.location.reload(false);
      }
      console.log("Token : " + responseData.token);
    } catch ({ response }) {
      console.log(response);
    }
  }

  // Update users //
  function handleLogin(e) {
    setConnection({ ...newConnection, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }
  // Redirection loginPage
  useEffect(() => {
    if (isAuthenticated) history.replace("/history");
  }, [history, isAuthenticated]);

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
