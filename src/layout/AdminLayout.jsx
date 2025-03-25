// layout/AdminLayout.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context API/user.context";

const AdminLayout = () => {
  const { user } = useContext(UserContext);
  
  // If no user or not admin, but don't redirect if we're already on login page
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminLayout;