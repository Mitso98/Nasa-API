const axios = require("axios");
const { Request } = require("../models/Request");

const saveImage = async (item) => {
  const imageData = item.data[0];
  const nasaId = imageData.nasa_id;
  let image = await Request.findById(nasaId);

  if (!image) {
    console.log("new Image created");
    image = new Request({
      _id: nasaId,
      title: imageData.title,
      description: imageData.description,
      photographer: imageData.photographer,
      location: imageData.location,
      date_created: imageData.date_created,
      media_type: imageData.media_type,
      center: imageData.center,
      keywords: imageData.keywords,
      thumbnail_url: item.links[0].href,
    });

    await image.save();
  }

  return image;
};

exports.fetchNasa = async (req, res) => {
  const { q, page_size = 2, page } = req.query;

  try {
    const response = await axios.get("http://images-api.nasa.gov/search", {
      params: {
        q,
        page_size,
        page,
      },
    });

    const { items } = response.data.collection;

    const newImages = items.map(saveImage);

    Promise.all(newImages).then((savedImages) =>
      res.json({
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
      })
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching images", error });
  }
};
