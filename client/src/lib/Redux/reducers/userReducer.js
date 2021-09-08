import * as actionTypes from "../constants/userConstants";

const INITIAL_STATE = {
  user: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      const newUser = {
        userId: action.payload._id,
        lastName: action.payload.lastName,
        firstName: action.payload.firstName,
        mail: action.payload.mail,
        city: action.payload.city,
        adress: action.payload.adress,
        tel: action.payload.tel,
        roles: action.payload.roles,
      };

      if (state.user === []) {
        // state.user.splice(0, state.user.length);

        return {
          ...state,
          user: [...state.user, newUser],
        };
      } else {
        return {
          ...state,
          user: [...state.user, newUser],
        };
      }

    case actionTypes.RESET_USER: {
      window.location.reload(false);
      return { user: [] };
    }
    default:
      return state;
  }
};
