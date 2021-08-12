var express = require("express");
var router = express.Router();
const { getProducts, getProductById } = require("../controllers/products");

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
