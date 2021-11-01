var express = require("express");
var router = express.Router();
const admin = require("../controllers/admin");
const multer = require("../middleware/multer");

router.post("/", multer, admin.addProduct);
router.post("/", admin.removeProduct);

module.exports = router;
