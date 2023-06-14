exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Logged out successfully" });
};
