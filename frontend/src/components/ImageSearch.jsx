import { useState } from "react";
import axios from "axios";
import { useFavorites } from "../FavContext";
import { addFavorite, removeFavorite } from "../services/fav";

const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [page, setPage] = useState(1);
  const { favorites, setFavorites } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddFavorite = async (image) => {
    try {
      const response = await addFavorite(image);
      setFavorites(response.data.user.favorites);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await removeFavorite(favoriteId);
      setFavorites(response.data.user.favorites);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const isFavorite = (imageId) => {
    return favorites.some((favorite) => favorite._id === imageId);
  };
  const fetchImages = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/nasa/search?q=${searchTerm}&page_size=2&page=${page}`
      );
      if (!response.data.data) {
        setError("No images found for the given search term");
        setImages([]);
      } else {
        setImages(response.data.data);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while fetching images", error);
      setLoading(false);

      if (error.response && error.response.status === 404) {
        setError("No images found for the given search term");
      } else {
        setError("An error occurred while fetching images");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(1);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchImages(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchImages(newPage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for images"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <h3>{image.title}</h3>
            <img src={image.thumbnail_url} alt={image.title} />
            <p>{image.description}</p>
            {!isFavorite(image._id) ? (
              <button onClick={() => handleAddFavorite(image)}>
                Add to Favorites
              </button>
            ) : (
              <button onClick={() => handleRemoveFavorite(image._id)}>
                Remove from Favorites
              </button>
            )}
          </div>
        ))}
      </div>
      {!images.length && <p>No Data for this query</p>}
      {previousPage && <button onClick={handlePreviousPage}>Previous</button>}
      {nextPage && <button onClick={handleNextPage}>Next</button>}
    </div>
  );
};

export default ImageSearch;
