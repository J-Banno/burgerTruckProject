var express = require("express");
var router = express.Router();
const checkout = require("../controllers/checkout");

router.post("/", checkout.createSession);

module.exports = router;
