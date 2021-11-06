const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = {
  toLogIn: async (req, res) => {
    // Find user
    const user = await User.findOne({ mail: req.body.mail }).exec();
    const userInfo = await User.find({ mail: req.body.mail }).exec();
    console.log(userInfo[0]);

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
      const newUser = {
        userId: userInfo[0]._id,
        lastName: userInfo[0].lastName,
        firstName: userInfo[0].firstName,
        mail: userInfo[0].mail,
        city: userInfo[0].city,
        adress: userInfo[0].adress,
        tel: userInfo[0].tel,
        roles: userInfo[0].roles,
        token: token,
      };

      console.log(newUser);

      if (user.roles === "ROLE_ADMIN") {
        res.json({
          success: true,
          userConnect: newUser,
          token,
          admin: true,
          user: true,
          message: "Welcom admin",
        });
      } else if (user.roles === "ROLE_USER") {
        res.json({
          success: true,
          userConnect: newUser,
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
