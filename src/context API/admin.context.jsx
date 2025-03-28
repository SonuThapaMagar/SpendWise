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

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [usersResponse, expensesResponse, budgetsResponse] = await Promise.all([
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

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setMetrics((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      return true;
    } catch (error) {
      setError(error.message);
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
      return true;
    } catch (error) {
      setError(error.message);
      console.error("Error updating user:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        metrics,
        loading,
        error,
        fetchAdminData, // Renamed for clarity
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

// import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// const AdminContext = createContext();

// export const AdminProvider = ({ children }) => {
//   const [admin, setAdmin] = useState({
//     username: "Admin",
//     role: "admin",
//   });
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [metrics, setMetrics] = useState({
//     totalUsers: 0,
//     totalExpenses: 0,
//     totalBudgets: 0,
//   });

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:4000/users");
//       if (!response.ok) throw new Error("Failed to fetch users");
//       const data = await response.json();
//       setUsers(data);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/users/${userId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete user");
//       setUsers((prev) => prev.filter((user) => user.id !== userId));
//       return true;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Fetching admin data...");
//         setLoading(true);
//         setError(null);

//         const usersResponse = await fetch("http://localhost:4000/users");
//         if (!usersResponse.ok) throw new Error("Failed to fetch users");
//         const usersData = await usersResponse.json();

//         const expensesResponse = await fetch("http://localhost:4000/expenses");
//         if (!expensesResponse.ok) throw new Error("Failed to fetch expenses");
//         const expensesData = await expensesResponse.json();

//         const budgetsResponse = await fetch("http://localhost:4000/budgets");
//         if (!budgetsResponse.ok) throw new Error("Failed to fetch budgets");
//         const budgetsData = await budgetsResponse.json();

//         const totalUsers = usersData.length;
//         const totalExpenses = expensesData.reduce(
//           (sum, expense) => sum + parseFloat(expense.expenseAmount || 0),
//           0
//         );
//         const totalBudgets = budgetsData.reduce(
//           (sum, budget) => sum + parseFloat(budget.budgetAmount || 0),
//           0
//         );

//         setMetrics({ totalUsers, totalExpenses, totalBudgets });
//         setUsers(usersData);

//         const expenseActivities = expensesData.map((expense) => ({
//           id: expense.id,
//           action: `User added an expense of $${expense.expenseAmount} in ${expense.category} category`,
//           time: expense.date,
//         }));

//         const budgetActivities = budgetsData.map((budget) => ({
//           id: budget.id,
//           action: `User set a budget of $${budget.budgetAmount} for ${budget.category}`,
//           time: budget.date,
//         }));

//         const allActivities = [...expenseActivities, ...budgetActivities].sort(
//           (a, b) => new Date(b.time) - new Date(a.time)
//         );
//         setRecentActivity(allActivities);

//         console.log("Admin data fetched successfully");
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   const logout = () => {
//     setAdmin(null);
//     setMetrics({ totalUsers: 0, totalExpenses: 0, totalBudgets: 0 });
//     setRecentActivity([]);
//     setUsers([]);
//     setError(null);
//   };

//   // Memoize the context value to prevent unnecessary re-renders
//   const contextValue = useMemo(
//     () => ({
//       admin,
//       setAdmin,
//       metrics,
//       recentActivity,
//       loading,
//       error,
//       logout,
//       fetchUsers,
//       deleteUser,
//       users,
//     }),
//     [admin, metrics, recentActivity, loading, error, users] // Dependencies that actually change
//   );

//   return (
//     <AdminContext.Provider value={contextValue}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdmin = () => useContext(AdminContext);
