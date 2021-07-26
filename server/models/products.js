const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: { type: String },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
