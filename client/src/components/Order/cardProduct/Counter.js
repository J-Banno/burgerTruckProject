import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Counter() {
  const { count } = useSelector((state) => ({
    ...state.counterReducer,
  }));
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch({
      type: "INCR",
    });
  };
  const decrementCount = () => {
    dispatch({
      type: "DECR",
    });
  };
  return (
    <div>
      <button onClick={incrementCount}>+</button>
      <p>Quanités : {count} </p>
      <button onClick={decrementCount}>-</button>
    </div>
  );
}
