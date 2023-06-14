const axios = require("axios");
const redisClient = require("../config/redis");
const { saveImage } = require("../services/saveImage");

exports.fetchNasa = async (req, res) => {
  const { q, page_size = 2, page } = req.query;
  const cacheKey = `fetchNasa:${q}:${page_size}:${page}`;

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return res.json(parsedData);
    }

    const response = await axios.get("http://images-api.nasa.gov/search", {
      params: {
        q,
        page_size,
        page,
      },
    });

    const { items } = response.data.collection;

    const newImages = items.map(saveImage);

    Promise.all(newImages).then((savedImages) => {
      const responseData = {
        data: savedImages,
        next: `/api/fetch?page=${
          parseInt(page) + 1
        }&page_size=${page_size}&q=${q}`,
        previous:
          page > 1
            ? `/api/fetch?page=${
                parseInt(page) - 1
              }&page_size=${page_size}&q=${q}`
            : null,
      };

      redisClient.set(cacheKey, JSON.stringify(responseData), "EX", 3600);

      res.json(responseData);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching images", error });
  }
};
