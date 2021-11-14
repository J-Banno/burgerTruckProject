const Order = require("../models/order");
const User = require("../models/user");
const ordersUser = {
  getOrdersUser: async (req, res) => {
    try {
      const userId = req.body.userId;

      const ordersInfo = await Order.find({ "user.id": userId });

      const myOrders = [];
      ordersInfo.forEach((element) => {
        let orders = {
          items: element.items[0].cart,
          dateCreation: element.dateCreation,
          isFinalize: element.isFinalize,
          idOrder: element._id,
        };
        myOrders.push(orders);
      });

      res.status(200).json({ myOrders, message: "success" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = ordersUser;
