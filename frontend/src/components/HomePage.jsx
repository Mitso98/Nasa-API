// src/components/HomePage.js
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h1>Welcome, {user ? user.name : "Guest"}!</h1>
    </div>
  );
}

export default HomePage;
