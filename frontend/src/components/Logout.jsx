// src/components/Logout.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../api";

function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      setUser(null);
      navigate("/");
    };

    performLogout();
  }, [setUser, navigate]);

  return null;
}

export default Logout;
