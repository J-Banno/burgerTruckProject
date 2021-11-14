const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function auth(req, res, next) {
  try {
    /* Get header */
    let header = req.get("Authorization");
    /* Get token */
    let token = header.split(" ")[1];

    if (!token) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token, "test");
    const user = await User.findOne({ _id: decoded.userId }).exec();
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
