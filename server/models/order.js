const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  dateCreation: { type: Date, default: new Date() },
  statut: { type: String, default: "inPreparation" },
  user: {
    mail: { type: String },
    id: { type: String },
  },
  items: [],
});

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;
