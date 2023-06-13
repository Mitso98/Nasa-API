const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = authMiddleware;
