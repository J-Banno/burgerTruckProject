import * as actionTypes from "../constants/cartConstants";

const INITIAL_STATE = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const cartProduct = {
        name: action.payload.title,
        qty: action.payload.quantity,
        price: action.payload.price,
        ref: action.payload._id,
        total: action.payload.quantity * action.payload.price,
      };

      const indexItemAdd = state.cart.findIndex(
        (obj) => obj.ref === action.payload._id
      );

      if (indexItemAdd !== -1) {
        const updateQuantity = {
          ...state.cart[indexItemAdd],
          qty: state.cart[indexItemAdd].qty + action.payload.quantity,
          total:
            (state.cart[indexItemAdd].qty + action.payload.quantity) *
            state.cart[indexItemAdd].price,
        };

        const newArr = [...state.cart];
        newArr.splice(indexItemAdd, 1, updateQuantity);
        return {
          cart: newArr,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case actionTypes.UPDATE_ITEM:
      const indexItemUpdate = state.cart.findIndex(
        (obj) => obj.ref === action.payload.ref
      );

      const newArr = [...state.cart];
      newArr.splice(indexItemUpdate, 1, action.payload);

      console.log(newArr);

      return {
        cart: newArr,
      };
  }
  return state;
};
