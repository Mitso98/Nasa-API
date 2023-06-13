import { createContext, useState, useEffect } from "react";
import { getUser } from "./services/auth";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("AuthProvider component rendered");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        console.log("User response:", response);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
