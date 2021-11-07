const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  date: Date,
  statut: String,
  idUserOriginal: String,
});

const UserSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adress: { type: String, required: true },
  city: { type: String, required: true },
  tel: { type: String, required: true },
  roles: {
    type: Array,
    required: true,
  },
  // order: [OrderSchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
