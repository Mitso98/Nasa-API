const User = require("../models/User");

exports.getAllFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error("Error getting all favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const favoriteData = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { favorites: favoriteData } },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { favorites: { _id: favoriteId } } },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
