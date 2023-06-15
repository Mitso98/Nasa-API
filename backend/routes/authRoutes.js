const express = require("express");
const { check } = require("express-validator");

const { emailVerificationLimiter } = require("../middlewares/rateLimiter");
const authenticateToken = require("../middlewares/authenticateToken");

const userController = require("../controllers/rateLimitInfoController");
const authUserController = require("../controllers/auth/authModular");

const registerValidation = require("../validators/registerValidation");
const { loginValidation } = require("../validators/loginValidation");
const router = express.Router();

router.post(
  "/register",
  registerValidation.registerValidation,
  authUserController.register.register
);
router.post("/login", loginValidation, authUserController.login.login);
router.post("/logout", authUserController.logout.logout);
router.post(
  "/verify-email",
  emailVerificationLimiter,
  [check("email", "Please include a valid email").isEmail()],
  authUserController.sendEmailverfication.sendEmailverfication
);

router.get("/verify-email/:token", authUserController.verifyEmail.verifyEmail);
router.get("/rateLimitInfo/:email", userController.rateLimitInfo);
router.get("/me", authenticateToken, authUserController.getUserObj.getUserObj);

module.exports = router;
