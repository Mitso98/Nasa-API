import axios from "axios";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const fav_url = `http://localhost:${SERVER_PORT}/api/favorites`;

export const addFavorite = async (favoriteData) => {
  return await axios.post(`${fav_url}/add`, favoriteData, {
    withCredentials: true,
  });
};

export const removeFavorite = async (favoriteId) => {
  return await axios.delete(`${fav_url}/delete/${favoriteId}`, {
    withCredentials: true,
  });
};

export const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${fav_url}/get`, {
      withCredentials: true,
    });
    return response.data.favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
