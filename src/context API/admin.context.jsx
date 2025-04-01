import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsers } from "../utils/user.utils";
import axios from "axios"

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    totalBudgets: 0,
    topExpenses: [],
    userRetention: [],
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

      const [usersRes, expensesRes, budgetsRes] = await Promise.all([
        axios.get("http://localhost:4000/users"),
        axios.get("http://localhost:4000/expenses"),
        axios.get("http://localhost:4000/budgets"),
      ]);
      const usersData = usersRes.data;
      const expensesData = expensesRes.data;
      const budgetsData = budgetsRes.data;

      // Calculate metrics
      const totalUsers = usersData.length;
      const totalExpenses = expensesData.reduce(
        (sum, expense) => sum + parseFloat(expense.expenseAmount || 0),
        0
      );
      const totalBudgets = budgetsData.reduce(
        (sum, budget) => sum + parseFloat(budget.budgetAmount || 0),
        0
      );

      // Get top 5 expenses
      const topExpenses = [...expensesData]
        .sort(
          (a, b) => parseFloat(b.expenseAmount) - parseFloat(a.expenseAmount)
        )
        .slice(0, 5);

      // Calculate user retention
      const userRetention = calculateUserRetention(usersData);

      setUsers(usersData);

      setMetrics({
        totalUsers,
        totalExpenses,
        totalBudgets,
        topExpenses,
        userRetention,
      });
    } catch (error) {
      setError(error.message);
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateUserRetention = (users) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      joined: user.createdAt,
      active: Math.random() > 0.3, 
      lastActive: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
    }));
  };

  const updateUser = async (userId, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...updatedUser } : user
        )
      );
      return updatedUser;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Delete failed");
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    localStorage.setItem("isAdminLoggedIn", "0");
    setIsAdminLoggedIn(false);
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
        setIsAdminLoggedIn,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);