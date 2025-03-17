import { useState } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserDashboard from "./pages/User/Dashboard"; 
import AdminDashboard from "./pages/Admin/Dashboard"; 

function App() {
  const [user, setUser] = useState(null);
  const login = (role) => {
    // Setting user role (admin or user)
    setUser({ role });
  };
  const logout = () => {
    // Clearing user state
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
