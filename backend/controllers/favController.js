const User = require("../models/User");
const redisClient = require("../config/redis");

exports.getAllFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 2;

    const skip = (page - 1) * pageSize;

    const cacheKey = `userFavorites:${req.user.userId}`;
    const cachedData = await redisClient.get(cacheKey);

    let favorites;
    if (cachedData) {
      favorites = JSON.parse(cachedData);
    } else {
      const userWithAllFavorites = await User.findById(req.user.userId).select(
        "favorites"
      );
      favorites = userWithAllFavorites.favorites;

      await redisClient.set(cacheKey, JSON.stringify(favorites));
    }

    const totalFavorites = favorites.length;
    const totalPages = Math.ceil(totalFavorites / pageSize);

    const next = page < totalPages ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;

    const pagedFavorites = favorites.slice(skip, skip + pageSize);

    res.status(200).json({
      favorites: pagedFavorites,
      currentPage: page,
      totalPages,
      pageSize,
      totalFavorites,
      next,
      prev,
    });
  } catch (error) {
    global.PINO_LOGGER.error("Error getting all favorites:", error);
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

    const cacheKey = `userFavorites:${req.user.userId}`;
    await redisClient.set(cacheKey, JSON.stringify(user.favorites));

    res.status(200).json({ user });
  } catch (error) {
    global.PINO_LOGGER.error("Error adding favorite:", error);
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

    const cacheKey = `userFavorites:${req.user.userId}`;
    await redisClient.set(cacheKey, JSON.stringify(user.favorites));

    res.status(200).json({ user });
  } catch (error) {
    global.PINO_LOGGER.error("Error removing favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
