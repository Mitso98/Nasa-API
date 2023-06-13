exports.logout = (req, res) => {
  // Clear the JWT from the response
  res.clearCookie("token");

  // Send a response
  return res.status(200).json({ msg: "Logged out successfully" });
};
