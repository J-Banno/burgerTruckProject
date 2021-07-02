import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/homePage/home";
import LoginPage from "./containers/loginPage/loginPage";
import Contact from "./containers/contactPage/contact";
import OrderPage from "./containers/orderPage/orderPage";
import RegistrationPage from "./containers//registrationPage/registrationPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
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
