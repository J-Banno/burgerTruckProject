// Import//
const Order = require("../models/order");
const User = require("../models/user");

const orders = {
  addOrder: async (req, res) => {
    //Création du document à partir du modèle//

    const userData = await User.findOne({ _id: req.body.decodedToken.userId });
    console.log(userData.mail);

    const newOrder = new Order({
      dateCreation: new Date(),
      statut: "inPreparation",
      user: {
        mail: userData.mail,
        id: userData._id,
      },
      items: req.body.cart.cart,
    });
    console.log(newOrder);
    // const cart = req.body.cart.cart;
    // const userToken = req.body.userToken;

    console.log(req.body.cart.cart);

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
};

module.exports = orders;
