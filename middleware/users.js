const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    // email min length 3
    if (!req.body.email || req.body.email.length < 5) {
      return res.status(400).send({
        msg: 'Please enter an email with min. 5 chars'
      });
    }

if (!req.body.phone_number || req.body.phone_number.length < 10) {
        return res.status(400).send({
          msg: 'Please enter a valid phone number'
        });
      }


    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.confirm_password ||
      req.body.password != req.body.confirm_password
    ) {
      return res.status(400).send({
        msg: 'Passwords are not matching'
      });
    }

    next();
  }
};