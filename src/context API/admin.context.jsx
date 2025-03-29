import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    totalBudgets: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "1"
  );

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [usersResponse, expensesResponse, budgetsResponse] =
        await Promise.all([
          fetch("http://localhost:4000/users"),
          fetch("http://localhost:4000/expenses"),
          fetch("http://localhost:4000/budgets"),
        ]);

      if (!usersResponse.ok) throw new Error("Failed to fetch users");
      if (!expensesResponse.ok) throw new Error("Failed to fetch expenses");
      if (!budgetsResponse.ok) throw new Error("Failed to fetch budgets");

      const usersData = await usersResponse.json();
      const expensesData = await expensesResponse.json();
      const budgetsData = await budgetsResponse.json();

      const totalUsers = usersData.length;
      const totalExpenses = expensesData.reduce(
        (sum, expense) => sum + parseFloat(expense.expenseAmount || 0),
        0
      );
      const totalBudgets = budgetsData.reduce(
        (sum, budget) => sum + parseFloat(budget.budgetAmount || 0),
        0
      );

      setUsers(usersData);
      setMetrics({ totalUsers, totalExpenses, totalBudgets });
    } catch (error) {
      setError(error.message);
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      console.log("Updating user:", userId, updatedData);
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("Update failed");
      const updatedUser = await response.json();
      console.log("Updated user data:", updatedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Update error:", error);
      throw error; // Rethrow to ensure UserManagement catches it
    }
  };

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user:", userId);
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete failed");
      }
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      console.log("User deleted successfully");
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  };

  const logoutAdmin = () => {
    localStorage.setItem("isAdminLoggedIn", "0");
    setIsAdminLoggedIn(false);
    console.log("Admin logged out: isAdminLoggedIn = 0");
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);

  return (
    <AdminContext.Provider
      value={{
        users,
        metrics,
        loading,
        error,
        fetchAdminData,
        deleteUser,
        updateUser,
        isAdminLoggedIn,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
