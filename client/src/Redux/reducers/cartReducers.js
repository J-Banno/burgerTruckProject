import * as actionTypes from "../constants/cartConstants";

const INITIAL_STATE = {
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

// const INITIAL_STATE = {
//   cart: [],
// };

// export default async function cartReducer(
//   state = INITIAL_STATE,
//   { type, id, qty }
// ) {
//   switch (type) {
//     case "ADD_TO_CART":
//       try {
//         const response = await fetch("http://localhost:8000/products", options);
//         const data = await response.json();

//         if (response.status !== 200) {
//           throw new Error(data.message);
//         }

//         const cartProduct = {
//           name: data.product.name,
//           qty: qty,
//           price: data.product.price,
//           vat: data.product.vat,
//         };

//         return { ...state, cart: [...state.cart, cartProduct] };
//       } catch (e) {
//         console.log(e);
//         return state;
//       }

//     case "UPDATE_CART":
//       return {};

//     case "REMOVE_FROM_CART":
//       return {};
//   }
// }
