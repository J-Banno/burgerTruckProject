import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../views/HomePage/home";
import Login from "../views/LoginPage/index";
import Contact from "../views/ContactPage/contact";
import Order from "../views/OrderPage/order";
import Register from "./RegisterPage/index";
import CartPage from "../components/Cart/cart";
import ErrorPage from "../components/Auth/errorPage/errorPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/order" exact component={Order} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/cart" exact component={CartPage} />
        <Route path="/" component={ErrorPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
