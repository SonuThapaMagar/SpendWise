import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    fetchTotalBudget();
    fetchTotalExpenses();
    fetchRecentExpenses();
  }, [budgets]);

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

  const fetchRecentExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/expenses");
      const expensesWithCategory = response.data.map((expense) => {
        const budget = budgets.find((b) => b.id === expense.budgetId);
        return {
          ...expense,
          category: budget ? budget.budgetName : expense.category || "Uncategorized",
        };
      });
      const sortedExpenses = expensesWithCategory.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentExpenses(sortedExpenses.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent expenses:", error);
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
        recentExpenses,
        budgets,
        fetchTotalBudget,
        fetchTotalExpenses,
        fetchRecentExpenses,
        fetchBudgets,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
