import * as actionTypes from "../constants/userConstants";

//ADD
export const addToCart = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_USER_SUCCESS,
    payload: {
      userId: data._id,
      lastName: data.lastName,
      firstName: data.firstName,
      mail: data.mail,
      city: data.city,
      adress: data.adress,
      tel: data.tel,
      roles: data.roles,
    },
  });
};
