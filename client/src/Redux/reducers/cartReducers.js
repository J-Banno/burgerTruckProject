import * as actionTypes from "../constants/cartConstants";

const INITIAL_STATE = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      console.log(action.payload.price);

      const cartProduct = {
        name: action.payload.title,
        qty: action.payload.quantity,
        price: action.payload.price,
        ref: action.payload._id,
        total: action.payload.quantity * action.payload.price,
      };
      console.log(action.payload.quantity * action.payload.price);
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };

    default:
      return state;
  }
};
