var express = require("express");
var router = express.Router();
const admin = require("../controllers/admin");

router.post("/", admin.addProduct);
router.post("/", admin.removeProduct);

module.exports = router;
