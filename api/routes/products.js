var express = require("express");
var router = express.Router();
const productsCatalog = require("../controllers/products");

router.get("/", productsCatalog.getProducts);

module.exports = router;
