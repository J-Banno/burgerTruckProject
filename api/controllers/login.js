const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = {
  toLogIn: async (req, res) => {
    console.log("Mail : " + req.body.mail);
    console.log("Mot de passe : " + req.body.password);

    // Find user
    const user = await User.findOne({ mail: req.body.mail }).exec();
    console.log(user);
    if (user instanceof Error) {
      res.status(500).json({ message: "erreur " });
      return;
    }
    if (!user) {
      res.status(500).json({ message: "User inconnu" });
      return;
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      //Token Id//
      const token = jwt.sign({ userId: user._id }, "test", {
        expiresIn: "24h",
      });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false });
    }
  },
};

module.exports = login;
