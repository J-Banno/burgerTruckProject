const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = {
  toLogIn: async (req, res) => {
    // Find user
    const user = await User.findOne({ mail: req.body.mail }).exec();
    const userInfo = await User.find({ mail: req.body.mail }).exec();

    if (user instanceof Error) {
      res.status(500).json({ message: "Connexion impossible" });
      return;
    }
    if (!user) {
      res
        .status(500)
        .json({ message: "Email ou mot de mot de passe invalide." });
      return;
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      //Token Id//
      const token = jwt.sign({ userId: user._id }, "test", {
        expiresIn: "24h",
      });

      if (user.roles === "ROLE_ADMIN") {
        res.json({
          success: true,
          userConnect: userInfo,
          token,
          admin: true,
          user: true,
          message: "Welcom admin",
        });
      } else if (user.roles === "ROLE_USER") {
        res.json({
          success: true,
          userConnect: userInfo,
          token,
          admin: false,
          user: true,
          message: "Welcom user",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Email ou mot de mot de passe invalide.",
        });
      }
    }
  },
};

module.exports = login;
