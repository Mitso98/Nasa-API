const dotenv = require("dotenv");
const { rateLimitInfoMap } = require("../middlewares/rateLimiter");
dotenv.config();

exports.rateLimitInfo = async (req, res) => {
  const email = req.params.email;
  if (rateLimitInfoMap.has(email)) {
    res.status(200).json(rateLimitInfoMap.get(email));
  } else {
    res.status(404).json({ msg: "Rate limit information not found." });
  }
};
