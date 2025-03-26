import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBudgets();
      await fetchTotalBudget();
      await fetchTotalExpenses();
      await fetchRecentTransactions();
    };
    fetchData();
  }, []);

  const fetchTotalBudget = async () => {
    try {
      const response = await axios.get("http://localhost:4000/budgets");
      const total = response.data.reduce((sum, budget) => {
        const amount = parseFloat(budget.budgetAmount); // Parse as number
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      setTotalBudget(total);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/expenses");
      const total = response.data.reduce((sum, expense) => {
        const amount = parseFloat(expense.expenseAmount); // Parse as number
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      // Fetching expenses
      const expensesResponse = await axios.get(
        "http://localhost:4000/expenses"
      );
      const expenses = expensesResponse.data
        .filter(
          (expense) =>
            expense.expenseAmount !== undefined &&
            expense.expenseAmount !== null
        )
        .map((expense) => ({
          ...expense,
          type: "expense",
          category: expense.category || expense.expenseName || "Uncategorized",
          amount: parseFloat(expense.expenseAmount) || 0,
          date: expense.date || new Date().toISOString(),
          icon: expense.icon || "💸",
        }));

      // Fetch budgets
      const budgetsResponse = await axios.get("http://localhost:4000/budgets");
      const budgetsData = budgetsResponse.data
        .filter(
          (budget) =>
            budget.budgetAmount !== undefined && budget.budgetAmount !== null
        )
        .map((budget) => ({
          ...budget,
          type: "budget",
          category: budget.budgetName || "Budget",
          amount: parseFloat(budget.budgetAmount) || 0,
          date: budget.date || new Date().toISOString(),
          icon: budget.icon || "💰", // Fallback emoji for budgets
        }));

      // Combining expenses and budgets
      const allTransactions = [...expenses, ...budgetsData];

      // Sort by date (most recent first) and take the top 5
      const sortedTransactions = allTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentTransactions(sortedTransactions.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      setRecentTransactions([]);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    setRemainingBalance(totalBudget - totalExpenses);
  }, [totalBudget, totalExpenses]);

  return (
    <BudgetContext.Provider
      value={{
        totalBudget,
        totalExpenses,
        remainingBalance,
        recentTransactions,
        budgets,
        fetchTotalBudget,
        fetchTotalExpenses,
        fetchRecentTransactions,
        fetchBudgets,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
