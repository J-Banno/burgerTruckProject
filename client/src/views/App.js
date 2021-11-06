//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import CartPage from "./Cart/cart";
import HistoryPage from "./HistoryPage/index";
import CheckoutForm from "../components/Checkout/CheckoutForm/checkoutForm";
import Success from "../components/Checkout/checkoutSuccess/index";
import Cancel from "../components/Checkout/checkoutCancel/index";
import AdminPage from "./AdminPage/index";
import ErrorPage from "../components/Auth/errorPage/errorPage";
import { getItem } from "../services/localStorage";
import * as actionTypes from "../lib/Redux/constants/userConstants";
import { useDispatch } from "react-redux";

function App() {
  const roleUser = getItem("roles");
  const token = getItem("token");
  console.log(roleUser);
  console.log(token);
  const dispatch = useDispatch();
  const user = {
    roles: getItem("roles"),
    token: getItem("token"),
  };
  dispatch({
    type: actionTypes.GET_USER_SUCCESS,
    payload: user,
  });
  return (
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
  );
}

export default App;
