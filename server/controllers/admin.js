//Import
const Products = require("../models/products");
require("dotenv").config();
const aws = require("aws-sdk");

//AWS
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accesKeyID = process.env.AWS_KEY;
const accesSecretKey = process.env.AWS_SECRET_KEY;

const admin = {
  ///Create product///
  addProduct: async (req, res) => {
    // const product = new Products({
    //   ...productObject,
    //   image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // });
    console.log(req.body);
    aws.config.setPromisesDependency();
    aws.config.update({
      region: region,
      accessKeyId: accesKeyID,
      secretAccessKey: accesSecretKey,
    });
    const s3 = new aws.S3();

    const response = await s3
      .listObjectsV2({
        Bucket: bucketName,
      })
      .promise();

    const productData = req.body;
    if (productData) {
      let createProduct = new Products({
        image: productData.urlImage,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
      });

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
