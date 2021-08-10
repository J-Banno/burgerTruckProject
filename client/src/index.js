import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import "./index.css";

// Import Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Store

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
