import { useState, useEffect } from "react";
import { removeFavorite, fetchFavorites } from "../services/fav";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      const fetchedFavorites = await fetchFavorites();
      if (Array.isArray(fetchedFavorites)) {
        setFavorites(fetchedFavorites);
      } else {
        setFavorites([]);
      }
    };

    getFavorites();
  }, [refresh]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing favorite:", error);
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
    </div>
  );
};

export default Favorites;
