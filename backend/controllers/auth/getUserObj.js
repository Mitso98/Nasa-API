const User = require("../../models/User");

exports.getUserObj = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.userId });
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
