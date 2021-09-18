//Import
const Products = require("../models/products");

const admin = {
  ///Create product///
  addProduct: async (req, res) => {
    //Role User ?

    //Admin Data
    const productData = req.body.product;
    console.log(req.body.imageProduct);

    if (productData) {
      let createProduct = new Products({
        image: "",
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
      });

      console.log(createProduct);
      const newProduct = await createProduct.save();
      if (newProduct instanceof Products) {
        res.json({
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
    //Role User ?
    const userRole = req.token.roles;
    const adminRole = userRole.find((element) => element === "ROLE_ADMIN");

    if (adminRole) {
      //Admin Data
      const productData = req.body;
      if (productData._id) {
        const result = await OffreModel.deleteOne({ _id: productData._id });
        if (result instanceof OffreModel) {
          res.json({ success: true, message: "Produit supprimer" });
        }
      } else {
        res
          .status(500)
          .json({ success: false, message: "Une erreur s'est produite!" });
      }
    } else {
      res.status(403).json({ success: false, message: "Accès non autorisé" });
    }
  },
};

module.exports = admin;
