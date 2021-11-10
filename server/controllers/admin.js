//Import
const Products = require("../models/products");
require("dotenv").config();

const admin = {
  ///Create product///
  addProduct: async (req, res) => {
    const productData = req.body;
    const url = `https://burger-truck-bocal.s3.eu-west-1.amazonaws.com/${req.url}`;

    if (productData) {
      let createProduct = new Products({
        image: url,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
      });
      console.log(createProduct);
      const newProduct = await createProduct.save();
      if (newProduct instanceof Products) {
        res.status(200).json({
          success: true,
          data: newProduct,
          message: "Produit enregistré",
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Une erreur s'est produite!" });
      }
    }
    //If data not complete
    else {
      res.status(400).json({
        success: false,
        message: "Données insuffisantes pour créer un produit",
      });
    }
  },

  ///Remove product///
  removeProduct: async (req, res) => {
    //Admin Data
    const productData = req.body;

    if (productData._id) {
      const result = await Products.deleteOne({ _id: productData._id });

      res.status(200).json({ success: true, message: "Produit supprimer" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Une erreur s'est produite!" });
    }
  },
};

module.exports = admin;
