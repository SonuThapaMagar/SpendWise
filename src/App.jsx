import React from "react";
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
import AddBudget from "./pages/User/Budget/AddBudget";
import EditBudget from "./pages/User/Budget/EditBudget";
import AddExpense from "./pages/User/Expense/AddExpense";
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

function App() {
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            {/* User routes */}
            <Route path="/users" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="budget" element={<Budget />} />
              <Route path="budget/addBudget" element={<AddBudget />} />
              <Route path="budget/editBudget/:id" element={<EditBudget />} />
              <Route path="expense" element={<Expense />} />
              <Route path="expense/addExpense" element={<AddExpense />} />
              <Route path="expense/editExpense/:id" element={<AddExpense />} />
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
}

export default App;
