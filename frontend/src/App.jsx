import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/Login" />}
      />

      <Route
        path="/Login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/Register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;