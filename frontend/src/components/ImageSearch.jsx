import { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [page, setPage] = useState(1);

  const fetchImages = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/nasa/search?q=${searchTerm}&page_size=2&page=${page}`
      );

      setImages(response.data.data);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error) {
      console.error("An error occurred while fetching images", error);
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
        <button type="submit">Search</button>
      </form>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <h3>{image.title}</h3>
            <img src={image.thumbnail_url} alt={image.title} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
      {previousPage && <button onClick={handlePreviousPage}>Previous</button>}
      {nextPage && <button onClick={handleNextPage}>Next</button>}
    </div>
  );
};

export default ImageSearch;