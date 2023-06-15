const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { JWT_SECRET } = process.env;

// GET request
// When the user uses the verification link
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, JWT_SECRET);

    // Update the user's verification status
    const user = await User.findOneAndUpdate({ email }, { isVerified: true });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "Email has been successfully verified. You can now log in.",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};
