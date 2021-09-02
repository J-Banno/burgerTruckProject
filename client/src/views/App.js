import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { hasAuthenticated } from "../services/authApi";
import Auth from "../lib/Contexts/auth";
import AuthenticatedRoute from "../components/ProtectedRoutes/authenticatedRoute";
import Home from "./HomePage";
import Login from "../views/LoginPage/index";
import Contact from "../views/ContactPage/contact";
import Order from "../views/OrderPage/order";
import Register from "./RegisterPage/index";
import CartPage from "../components/Cart/cart";
import HistoryPage from "./HistoryPage/index";
import ErrorPage from "../components/Auth/errorPage/errorPage";

function App() {
  //Context
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  console.log("context :" + isAuthenticated);
  console.log("Test auth :" + isAuthenticated);

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/order" exact component={Order} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart" exact component={CartPage} />
          <AuthenticatedRoute path="/history" component={HistoryPage} />
          <Route path="/" component={ErrorPage}></Route>
        </Switch>
      </Router>
    </Auth.Provider>
  );
}

export default App;
