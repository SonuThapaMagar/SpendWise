import React, { createContext, useContext, useState,useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    username: "Admin",
    role: "admin",
  });

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    totalBudgets: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch users
        const usersResponse = await fetch("http://localhost:3001/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await usersResponse.json();

        // Fetch expenses
        const expensesResponse = await fetch("http://localhost:3001/expenses");
        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const expensesData = await expensesResponse.json();

        // Fetch budgets
        const budgetsResponse = await fetch("http://localhost:3001/budgets");
        if (!budgetsResponse.ok) {
          throw new Error("Failed to fetch budgets");
        }
        const budgetsData = await budgetsResponse.json();

        // Calculate metrics
        const totalUsers = usersData.length;
        const totalExpenses = expensesData.reduce(
          (sum, expense) => sum + parseFloat(expense.expenseAmount),
          0
        );
        const totalBudgets = budgetsData.reduce(
          (sum, budget) => sum + parseFloat(budget.budgetAmount),
          0
        );

        setMetrics({
          totalUsers,
          totalExpenses,
          totalBudgets,
        });

        // Derive recent activity from expenses and budgets
        const expenseActivities = expensesData.map((expense) => ({
          id: expense.id,
          action: `User added an expense of $${expense.expenseAmount} in ${expense.category} category`,
          time: expense.date,
        }));

        const budgetActivities = budgetsData.map((budget) => ({
          id: budget.id,
          action: `User set a budget of $${budget.budgetAmount} for ${budget.category}`,
          time: budget.date,
        }));

        // Combine and sort activities by date (most recent first)
        const allActivities = [...expenseActivities, ...budgetActivities].sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
        setRecentActivity(allActivities);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    setAdmin(null);
    setMetrics({ totalUsers: 0, totalExpenses: 0, totalBudgets: 0 });
    setRecentActivity([]);
    setError(null);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        metrics,
        recentActivity,
        loading,
        error,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
