// src/components/Header.js
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      {user ? (
        <Link to="/logout" className={styles.link}>
          Logout
        </Link>
      ) : (
        <>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;