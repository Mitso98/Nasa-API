const User = require("../models/User");

exports.getAllFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 2;

    const skip = (page - 1) * pageSize;

    const userWithPagedFavorites = await User.findById(req.user.userId)
      .select("favorites")
      .slice("favorites", [skip, pageSize]);

    const userWithAllFavorites = await User.findById(req.user.userId).select(
      "favorites"
    );

    const totalFavorites = userWithAllFavorites.favorites.length;
    const totalPages = Math.ceil(totalFavorites / pageSize);

    const next = page < totalPages ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;

    res.status(200).json({
      favorites: userWithPagedFavorites.favorites,
      currentPage: page,
      totalPages,
      pageSize,
      totalFavorites,
      next,
      prev,
    });
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
