const { Request } = require("../models/Request");

exports.saveImage = async (item) => {
  const imageData = item.data[0];
  const nasaId = imageData.nasa_id;
  let image = await Request.findById(nasaId);

  if (!image) {
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
