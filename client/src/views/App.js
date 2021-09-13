import { useState } from "react";
//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Context
import { hasAuthenticated } from "../services/authApi";
import Auth from "../lib/Contexts/auth";
//Private Route
import AuthenticatedRoute from "../components/ProtectedRoutes/authenticatedRoute";
import CheckoutRoute from "../components/ProtectedRoutes/checkoutRoute";
import AdminRoute from "../components/ProtectedRoutes/adminRoute";
//Views
import Home from "./HomePage";
import Login from "../views/LoginPage/index";
import Contact from "../views/ContactPage/contact";
import Order from "../views/OrderPage/order";
import Register from "./RegisterPage/index";
import CartPage from "../components/Cart/cart";
import HistoryPage from "./HistoryPage/index";
import CheckoutForm from "./CheckoutForm/checkoutForm";
import Success from "../components/Checkout/checkoutSuccess/index";
import Cancel from "../components/Checkout/checkoutCancel/index";

import AdminPage from "./AdminPage/index";

import ErrorPage from "../components/Auth/errorPage/errorPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

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

          <Route path="/success.html" component={Success} />
          <Route path="/cancel.html" component={Cancel} />

          <AdminRoute path="/dashboardAdmin" component={AdminPage} />
          <AuthenticatedRoute path="/history" component={HistoryPage} />
          <CheckoutRoute path="/checkoutForm" component={CheckoutForm} />

          <Route path="/" component={ErrorPage}></Route>
        </Switch>
      </Router>
    </Auth.Provider>
  );
}

export default App;
