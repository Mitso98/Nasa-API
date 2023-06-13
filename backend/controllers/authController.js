const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { rateLimitInfoMap } = require("../middlewares/rateLimiter");
dotenv.config();
const { JWT_SECRET, SMTP_USER, PORT } = process.env;

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Password Reset",
      text: `Reset your password by clicking the following link: http://localhost:${PORT}/api/users/reset-password/${resetToken}`,
    };
    await mailer.sendMail(mailOptions);

    user.resetPasswordToken = resetToken;
    await user.save();

    return res.status(200).json({ msg: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.rateLimitInfo = async (req, res) => {
  const email = req.params.email;
  if (rateLimitInfoMap.has(email)) {
    res.status(200).json(rateLimitInfoMap.get(email));
  } else {
    res.status(404).json({ msg: "Rate limit information not found." });
  }
};
