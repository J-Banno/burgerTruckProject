const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastName: { type: String, unique: true },
  firstName: { type: String, unique: true },
  mail: { type: String, unique: true },
  pass: { type: String, required: true },
  cardType: {
    type: String,
    required: true,
    enum: ["Visa", "Mastercard"],
  },
  cardNumber: { type: String, required: true },
  cvv: { type: Number, required: true },
  expiryDate: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
