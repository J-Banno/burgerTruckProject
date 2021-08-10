import React from "react";
import "./loginForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
  const history = useHistory();
  let [newConnection, setConnection] = useState({
    mail: "",
    password: "",
  });

  // Takes UserLogin data //
  async function postloginData(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(newConnection),
      headers: { "content-type": "application/json" },
    };

    // Waiting for the response from the api//

    const response = await fetch("http://localhost:8000/login", options);
    const responseData = await response.json();
    if (responseData.success === true) {
      localStorage.setItem("token", responseData.token);
      history.push("/order");
    }
    console.log(responseData.token);
  }

  // Update users //
  function handleLogin(e) {
    setConnection({ ...newConnection, [e.target.name]: e.target.value });
    console.log(e.target.value);
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
