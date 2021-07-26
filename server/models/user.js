const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastName: { type: String, unique: true },
  firstName: { type: String, unique: true },
  mail: { type: String, unique: true },
  password: { type: String, required: true },
  adress: { type: String, required: true },
  city: { type: String, required: true },
  tel: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
