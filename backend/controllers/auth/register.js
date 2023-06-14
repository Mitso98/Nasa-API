const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
const {
  generateEmailVerificationToken,
  sendEmail,
} = require("../../services/emailService");

dotenv.config();
const { PORT } = process.env;

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const validationError = await user.validate();
    if (validationError) {
      return res.status(400).json({ errors: validationError.errors });
    }

    const verificationToken = generateEmailVerificationToken(email);
    const message = `Please verify your email by clicking the following link: http://localhost:${PORT}/api/users/verify-email/${verificationToken}`;
    await sendEmail(email, verificationToken, message);

    user.save();
    return res.status(201).json({
      msg: "User registered successfully , verify your email to be able to login!",
    });
  } catch (error) {
    global.PINO_LOGGER.PINO_LOGGER.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
