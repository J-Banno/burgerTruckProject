const Products = require("../models/products");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getProducts,
  getProductById,
};
