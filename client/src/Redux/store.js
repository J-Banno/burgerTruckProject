import { createStore, combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";
import counterReducer from "./reducer/counterReducer";

const rootReducer = combineReducers({
  counterReducer,
});

const store = createStore(rootReducer);

export default store;
