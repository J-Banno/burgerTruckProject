import * as actionTypes from "../constants/cartConstants";

//ADD
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const options = {
    method: "GET",
  };
  const response = await fetch(`http://localhost:8000/products/${id}`, options);
  const data = await response.json();

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.title,
      price: data.price,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

//REMOVE
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
