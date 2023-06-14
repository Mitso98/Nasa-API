const { check } = require("express-validator");

exports.loginValidation = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter your password").notEmpty(),
];
