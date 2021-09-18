// Import//
const Order = require("../models/order");
const User = require("../models/user");

const orders = {
  addOrder: async (req, res) => {
    //Création du document à partir du modèle//

    const userData = await User.findOne({ _id: req.body.decodedToken.userId });

    const newOrder = new Order({
      dateCreation: new Date(),
      statut: "inPreparation",
      isFinalize: false,
      user: {
        mail: userData.mail,
        id: userData._id,
      },
      items: req.body.cart.cart,
    });

    //Save Order//
    newOrder.save((error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ Message: { error } });
      } else {
        res.status(200).json({
          success: true,
          Message: "Votre commande a été pris en compte.",
        });
      }
    });
  },

  getOrders: async (req, res) => {
    try {
      const order = await Order.find({ isFinalize: false });

      res.status(200).json({ order, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = orders;
