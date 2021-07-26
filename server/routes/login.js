var express = require("express");
var router = express.Router();
const login = require("../controllers/login");

router.post("/", login.toLogIn);
module.exports = router;
