const INITIAL_STATE = {
  cart: [],
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {};

    case "UPDATE_CART":
      return {};

    case "REMOVE_FROM_CART":
      return {};
  }
}
