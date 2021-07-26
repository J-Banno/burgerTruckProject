var express = require("express");
var router = express.Router();
const register = require("../controllers/register");

router.post("/", register.createUser);

module.exports = router;
