import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [last30DaysExpenses, setLast30DaysExpenses] = useState([]);
  const [last30DaysChartData, setLast30DaysChartData] = useState([]);
  const [last60DaysBudgets, setLast60DaysBudgets] = useState([]);
  const [last60DaysIncomeChartData, setLast60DaysIncomeChartData] = useState(
    []
  );
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBudgets();
      await fetchTotalBudget();
      await fetchTotalExpenses();
      await fetchRecentTransactions();
      await fetchLast30DaysExpenses();
      await fetchLast60DaysBudgets();
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

  const fetchLast30DaysExpenses = async () => {
    try {
      // Fetch expenses
      const response = await axios.get("http://localhost:4000/expenses");
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Filter expenses from the last 30 days
      const filteredExpenses = response.data
        .filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate >= thirtyDaysAgo &&
            expense.expenseAmount !== undefined &&
            expense.expenseAmount !== null
          );
        })
        .map((expense) => ({
          ...expense,
          category: expense.category || expense.expenseName || "Uncategorized",
          amount: parseFloat(expense.expenseAmount) || 0,
          date: expense.date || new Date().toISOString(),
          icon: expense.icon || "💸",
        }));

      // Sort by date (most recent first)
      const sortedExpenses = filteredExpenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setLast30DaysExpenses(sortedExpenses);

      // Prepare chart data: Aggregate expenses by day
      const dailyExpenses = {};
      filteredExpenses.forEach((expense) => {
        const date = new Date(expense.date).toLocaleDateString();
        if (!dailyExpenses[date]) {
          dailyExpenses[date] = 0;
        }
        dailyExpenses[date] += expense.amount;
      });

      const chartData = Object.keys(dailyExpenses).map((date, index) => ({
        date,
        amount: dailyExpenses[date],
        key: `chart-bar-${index}`, // Add a unique key
      }));
      setLast30DaysChartData(chartData);
    } catch (error) {
      console.error("Error fetching last 30 days expenses:", error);
      setLast30DaysExpenses([]);
      setLast30DaysChartData([]);
    }
  };

  const fetchLast60DaysBudgets = async () => {
    try {
      // Fetch budgets
      const response = await axios.get("http://localhost:4000/budgets");
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      // Filter budgets from the last 60 days
      const filteredBudgets = response.data
        .filter((budget) => {
          const budgetDate = new Date(budget.date);
          return (
            budgetDate >= sixtyDaysAgo &&
            budget.budgetAmount !== undefined &&
            budget.budgetAmount !== null
          );
        })
        .map((budget) => ({
          ...budget,
          category: budget.budgetName || "Budget",
          amount: parseFloat(budget.budgetAmount) || 0,
          date: budget.date || new Date().toISOString(),
          icon: budget.icon || "💰",
        }));

      // Sort by date (most recent first)
      const sortedBudgets = filteredBudgets.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setLast60DaysBudgets(sortedBudgets);

      // Prepare chart data: Aggregate budgets by category
      const categoryTotals = {};
      filteredBudgets.forEach((budget) => {
        const category = budget.category;
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
        categoryTotals[category] += budget.amount;
      });

      // Define colors for each category (matching the image)
      const categoryColors = {
        Salary: "#6b48ff", // Purple
        "Interest from Savings": "#ff4d4f", // Red
        "E-commerce Sales": "#ff7a45", // Orange
        "Graphic Design": "#1890ff", // Blue
        "Affiliate Marketing": "#13c2c2", // Cyan (not in image, but added for additional categories)
        Budget: "#13c2c2", // Default color for "Budget" category
      };

      const chartData = Object.keys(categoryTotals).map((category, index) => ({
        name: category,
        value: categoryTotals[category],
        color:
          categoryColors[category] ||
          `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Fallback random color
      }));
      setLast60DaysIncomeChartData(chartData);
    } catch (error) {
      console.error("Error fetching last 60 days budgets:", error);
      setLast60DaysBudgets([]);
      setLast60DaysIncomeChartData([]);
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
        last30DaysExpenses,
        last30DaysChartData,
        last60DaysBudgets,
        last60DaysIncomeChartData,
        budgets,
        fetchTotalBudget,
        fetchTotalExpenses,
        fetchRecentTransactions,
        fetchLast30DaysExpenses,
        fetchLast60DaysBudgets,
        fetchBudgets,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
