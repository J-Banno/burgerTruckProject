import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import { cartReducer } from "./reducers/cartReducers";

import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";

const rootReducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
