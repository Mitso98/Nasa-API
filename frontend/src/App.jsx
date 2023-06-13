import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Logout from "./components/Logout";
import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";
import ImageSearch from "./components/ImageSearch";
import { AuthContext } from "./AuthContext";
import Favorites from "./components/Favorites";
import { FavoriteProvider } from "./FavContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <FavoriteProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/favorites" element={<ProtectedRoute />}>
            <Route index element={<Favorites />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/image" element={<ProtectedRoute />}>
            <Route index element={<ImageSearch />} />
          </Route>
          {!user && <Route path="/login" element={<Login />} />}
          <Route path="/home" element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/logout" element={<ProtectedRoute />}>
            <Route index element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </FavoriteProvider>
  );
}

export default App;
