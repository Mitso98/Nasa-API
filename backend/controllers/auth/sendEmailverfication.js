const User = require("../../models/User");
const dotenv = require("dotenv");
const {
  generateEmailVerificationToken,
  sendEmail,
} = require("../../services/emailService");

dotenv.config();
const { PORT } = process.env;

exports.sendEmailverfication = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const verificationToken = generateEmailVerificationToken(email);

    const message = `Please verify your email by clicking the following link: http://localhost:${PORT}/api/users/verify-email/${verificationToken}`;
    await sendEmail(email, verificationToken, message);

    return res.status(200).json({ msg: "Verification email sent" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};
