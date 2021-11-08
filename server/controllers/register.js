// Import//
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = {
  createUser: (req, res) => {
    //Encryptage du mot de passe//
    let encryptedPass = bcrypt.hashSync(req.body.password, 10);

    //Création du document à partir du modèle//

    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      mail: req.body.mail,
      city: req.body.city,
      adress: req.body.adress,
      tel: req.body.tel,
      password: encryptedPass,
      roles: ["ROLE_USER"],
    });

    //Save User//
    try {
      if (req.body.password != req.body.passwordConfirm) {
        res.status(400).json({
          success: false,
          message: "Les mots de pass ne sont pas similaires",
        });
      } else {
        newUser.save((error) => {
          if (error) {
            res.status(400).json({
              message: "Votre inscription a échoué, vous avez déjà un compte.",
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Votre inscription a été pris en compte.",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = register;
