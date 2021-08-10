import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Login from "./components/Auth/Login/index";
import Contact from "./components/Misc/Contact/contact";
import Order from "./components/Order/order";
import Register from "./components/Auth/Register/index";
import CartPage from "./components/Cart/cart";
import ErrorPage from "./components/Auth/errorPage/errorPage";

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
