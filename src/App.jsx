import React, { memo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import Budget from "./pages/User/Budget/Budget";
import UserLayout from "./layout/UserLayout";
import Expense from "./pages/User/Expense/Expense";
import About from "./content/About";
import Services from "./content/Services";
import Contact from "./content/Contact";
import { UserProvider } from "./context API/user.context";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/User/Profile";
import EditProfile from "./pages/User/EditProfile";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminLayout from "./layout/AdminLayout";
import { BudgetProvider } from "./context API/BudgetContext";
import { AdminProvider } from "./context API/admin.context";
import UserManagement from "./pages/Admin/UserManagement";
import Reports from "./pages/Admin/Reports";

const App = memo(() => {
  useEffect(() => {
    const blockReload = (e) => {
      if (e.target.closest('button, [role="button"]')) {
        e.preventDefault();
      }
    };
    document.addEventListener("click", blockReload, { capture: true });
    return () => document.removeEventListener("click", blockReload);
  }, []);

  return (
    <UserProvider>
      <BudgetProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProvider>
                  <AdminLayout />
                </AdminProvider>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* User routes */}
            <Route path="/users" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="budget" element={<Budget />} />
              <Route path="expense" element={<Expense />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="changePassword" element={<ChangePassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </BudgetProvider>
    </UserProvider>
  );
});

export default App;
