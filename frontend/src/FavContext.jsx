import { createContext, useState, useContext } from "react";

const FavoriteContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  return useContext(FavoriteContext);
};

// eslint-disable-next-line react/prop-types
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const value = {
    favorites,
    setFavorites,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
