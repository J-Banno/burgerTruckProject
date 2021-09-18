// Import//
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = {
  createUser: (req, res) => {
    console.log("Nom : " + req.body.lastName);
    console.log("Prénom : " + req.body.firstName);
    console.log("Mail : " + req.body.mail);
    console.log("Mot de passe : " + req.body.password);
    console.log("Adresse : " + req.body.adress);
    console.log("Numéro de téléphone : " + req.body.tel);
    console.log("ville : " + req.body.city);

    //Encryptage du mot de passe//
    let encryptedPass = bcrypt.hashSync(req.body.password, 10);

    // const { lastName, firstName, mail, city, adress, tel } = req.body;

    //Création du document à partir du modèle//

    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      mail: req.body.mail,
      city: req.body.city,
      adress: req.body.adress,
      tel: req.body.tel,
      password: encryptedPass,
      roles: "ROLE_USER",
    });
    console.log(newUser);

    //Save User//

    if (req.body.password != req.body.passwordConfirm) {
      res.status(400).json({
        success: false,
        message: "Les mots de pass ne sont pas similaires",
      });
    } else {
      newUser.save((error) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: { error } });
        } else {
          res.status(200).json({
            success: true,
            Message: "Votre inscription a été pris en compte.",
          });
        }
      });
    }
  },
};

module.exports = register;
