import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./containers/homePage/home";
import LoginPage from "./containers/loginPage/loginPage";
import Contact from "./containers/contactPage/contact";
import OrderPage from "./containers/orderPage/orderPage";
import RegistrationPage from "./containers//registrationPage/registrationPage";
import ErrorPage from "./containers/errorPage/errorPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/Contact" exact component={Contact} />
        <Route path="/Order" exact component={OrderPage} />
        <Route path="/Login" exact component={LoginPage} />
        <Route path="/Registration" exact component={RegistrationPage} />
        <Route path="/" component={ErrorPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
