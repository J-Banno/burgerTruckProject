const Products = require("../models/products");

const productsCatalog = {
  getProducts: async (req, res) => {
    const productsData = await Products.find({}).exec();
    console.log(productsData);
    if (productsData instanceof Error) {
      res.status(500).json({ message: "Error" });
      return;
    }

    res.json(productsData);
  },
};
module.exports = productsCatalog;
