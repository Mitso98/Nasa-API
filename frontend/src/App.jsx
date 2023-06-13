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

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        {!user && <Route path="/login" element={<Login />} />}
        <Route path="/image" element={<ProtectedRoute />}>
          <Route index element={<ImageSearch />} />
        </Route>
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route index element={<Logout />} />
        </Route>

        {/* 
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </div>
  );
}

export default App;
