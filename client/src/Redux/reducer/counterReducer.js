const INITIAL_STATE = {
  count: 0,
};

export default function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INCR":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECR":
      if (state.count === 0) {
        return state;
      } else
        return {
          ...state,
          count: state.count - 1,
        };

    default:
      return state;
  }
}
