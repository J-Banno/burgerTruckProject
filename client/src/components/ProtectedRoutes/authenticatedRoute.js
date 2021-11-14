import { Redirect, Route } from "react-router-dom";
import { isUser } from "../../services/authApi";
import { useSelector } from "react-redux";
const AuthenticatedRoute = ({ path, component }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const userConnect = user[0];
  const userRole = isUser(userConnect);

  return userRole ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthenticatedRoute;
