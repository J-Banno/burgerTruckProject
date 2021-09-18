var express = require("express");
var router = express.Router();
const orders = require("../controllers/order");

router.post("/", orders.addOrder);
router.get("/", orders.getOrders);

module.exports = router;
