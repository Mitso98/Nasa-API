const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { check } = require("express-validator");
const { emailVerificationLimiter } = require("../middlewares/rateLimiter");
const userController = require("../controllers/authController");
const { register } = require("../controllers/auth/register");
const { login } = require("../controllers/auth/login");
const { logout } = require("../controllers/auth/logout");
const { verifyEmail } = require("../controllers/auth/verifyEmail");
const {
  sendEmailverfication,
} = require("../controllers/auth/sendEmailverfication");
const authenticateToken = require("../middlewares/authenticateToken");
const { getUserObj } = require("../controllers/auth/getUserObj");

dotenv.config();
const { SMTP_USER } = process.env;

// validation rules
const registerValidation = [
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

const loginValidation = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter your password").notEmpty(),
];

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post(
  "/reset-password",
  check("email", "Email is required").isEmail(),
  userController.resetPassword
);
router.post(
  "/verify-email",
  emailVerificationLimiter,
  [check("email", "Please include a valid email").isEmail()],
  sendEmailverfication
);

router.get("/verify-email/:token", verifyEmail);
router.get("/rateLimitInfo/:email", userController.rateLimitInfo);
router.get("/me", authenticateToken, getUserObj);

module.exports = router;
