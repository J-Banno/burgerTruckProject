import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import { cartReducer } from "./reducers/cartReducers";

import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
