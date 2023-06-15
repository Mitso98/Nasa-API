const { check } = require("express-validator");

const { SMTP_USER } = process.env;

exports.registerValidation = [
  check("name", "Please enter your name").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("email", "Email is not allowed").custom((value) => {
    if (value === SMTP_USER) {
      throw new Error("SMTP_USER is not allowed");
    }
    return true;
  }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Please enter a password with 8 or more characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
  check("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }
  ),
];
