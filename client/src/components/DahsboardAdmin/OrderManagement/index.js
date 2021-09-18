import React, { useState, useEffect } from "react";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    getOrders();
    console.log(orders);
  }, []);
  async function getOrders() {
    const options = {
      method: "GET",
    };

    const response = await fetch("http://localhost:8000/order", options);
    const ordersData = await response.json();

    setIsSuccess(ordersData.success);
    setOrders(ordersData.order);
    console.log();
  }

  function displayOrderProcduct() {
    if (isSuccess === true) {
      return orders.map((i) => {
        const cartProducts = i.items[0].cart;
        return cartProducts.map((i) => {
          console.log(i.name);
        });
      });
    } else {
      // displayOrderProcduct();
      console.log("Loading");
    }
  }

  function OrderProcduct() {
    isSuccess === true
      ? orders.map((i) => {
          return <h1>{i.user.mail}</h1>;
          // <tr className="itemCartProduct" key={orders._id}>
          //   <th width="200">{i.user.mail}</th>
          //   <th width="150">{i.user.date} </th>

          // </tr>;

          // const cartProducts = i.items[0].orders;
          // return cartProducts.map((i) => {
          //   console.log(i.name);
          // });
        })
      : // displayOrderProcduct();
        console.log("bonjour");
  }

  return (
    <div>
      {" "}
      {isSuccess === true
        ? orders.map((i) => {
            return <h1>{i.user.mail}</h1>;
            // <tr className="itemCartProduct" key={orders._id}>
            //   <th width="200">{i.user.mail}</th>
            //   <th width="150">{i.user.date} </th>

            // </tr>;

            // const cartProducts = i.items[0].orders;
            // return cartProducts.map((i) => {
            //   console.log(i.name);
            // });
          })
        : // displayOrderProcduct();
          console.log("bonjour")}
    </div>
  );
}
