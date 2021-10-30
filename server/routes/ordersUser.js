var express = require("express");
var router = express.Router();
const ordersUser = require("../controllers/ordersUser");

router.post("/", ordersUser.getOrdersUser);

module.exports = router;
