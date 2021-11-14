import { Redirect, Route } from "react-router-dom";
import { isAdmin } from "../../services/authApi";
import { useSelector } from "react-redux";
const CheckoutRoute = ({ path, component }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const userConnect = user[0];
  const userAdmin = isAdmin(userConnect);

  return userAdmin ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default CheckoutRoute;
