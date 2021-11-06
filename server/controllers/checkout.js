require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const domain = process.env.DB_HOST;

const checkout = {
  createSession: async (req, res) => {
    try {
      cartProducts = req.body;

      const session = await stripe.checkout.sessions.create({
        line_items: cartProducts,
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${domain}success.html`,
        cancel_url: `${domain}cancel.html`,
      });
      res.json({ id: session.id, message: "Payment is accepted" });
      console.log("OK");
    } catch (err) {
      console.log(err);
      return res.status(500).send(`error payment ${err}`);
    }
  },
};

module.exports = checkout;

// const cartPrice = [];
// for (let i = 0; i < req.body.length; i++) {
//   cartPrice.push(req.body[i].total);
//   const reducer = (previousValue, currentValue) => previousValue + currentValue;
//   totalPrice = cartPrice.reduce(reducer);
// }
