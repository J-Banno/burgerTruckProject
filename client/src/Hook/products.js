import React, { createContext, useState } from "react";

export const MyContext = createContext();

const MyContextProvider = (props) => {
  const [product, setProduct] = useState([]);

  const myContextValue = {
    catalog,
    setProduct,
    findBurger: function (burger) {
      product.filter((burger) => burger.category.includes("burger"));
    },
  };
  return (
    <MyContext.Provider value={{ myContextValue }}>
      {props.children}
    </MyContext.Provider>
  );
};
