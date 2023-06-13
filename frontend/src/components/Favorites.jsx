import { useState, useEffect } from "react";
import { removeFavorite, fetchFavorites } from "../services/fav";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 2,
    totalFavorites: 0,
    next: null,
    prev: null,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      const fetchedFavorites = await fetchFavorites(
        pagination.currentPage,
        pagination.pageSize
      );
      if (fetchedFavorites && Array.isArray(fetchedFavorites.favorites)) {
        setFavorites(fetchedFavorites.favorites);
        setPagination((prevPagination) => ({
          ...prevPagination,
          currentPage: fetchedFavorites.currentPage,
          totalPages: fetchedFavorites.totalPages,
          totalFavorites: fetchedFavorites.totalFavorites,
          next: fetchedFavorites.currentPage < fetchedFavorites.totalPages,
          prev: fetchedFavorites.currentPage > 1,
        }));
      } else {
        setFavorites([]);
      }
    };

    getFavorites();
  }, [refresh, pagination.currentPage, pagination.pageSize]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleNext = () => {
    if (pagination.next) {
      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
    }
  };

  const handlePrev = () => {
    if (pagination.prev) {
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    }
  };

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {!favorites.length && <p>No Data to be shown!</p>}
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            {favorite.title}{" "}
            <button onClick={() => handleRemoveFavorite(favorite._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrev} disabled={!pagination.prev}>
          Prev
        </button>
        <button onClick={handleNext} disabled={!pagination.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
