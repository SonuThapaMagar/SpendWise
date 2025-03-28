  import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
  } from "react";
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
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch initial data only once on mount
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          setLoading(true);
          setError(null);

          const [budgetsResponse, expensesResponse] = await Promise.all([
            axios.get("http://localhost:4000/budgets"),
            axios.get("http://localhost:4000/expenses"),
          ]);

          const budgetsData = budgetsResponse.data || [];
          const expensesData = expensesResponse.data || [];

          setBudgets(budgetsData);
          setExpenses(expensesData);

          // Calculate totals
          const budgetTotal = budgetsData.reduce((sum, budget) => {
            const amount = parseFloat(budget.budgetAmount);
            return sum + (isNaN(amount) ? 0 : amount);
          }, 0);
          setTotalBudget(budgetTotal);

          const expenseTotal = expensesData.reduce((sum, expense) => {
            const amount = parseFloat(expense.expenseAmount);
            return sum + (isNaN(amount) ? 0 : amount);
          }, 0);
          setTotalExpenses(expenseTotal);

          // Update derived states
          updateRecentTransactions(budgetsData, expensesData);
          updateLast30DaysExpenses(expensesData);
          updateLast60DaysBudgets(budgetsData);
        } catch (error) {
          console.error("Error fetching initial data:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialData();
    }, []);

    // Update remaining balance when totals change
    useEffect(() => {
      setRemainingBalance(totalBudget - totalExpenses);
    }, [totalBudget, totalExpenses]);

    // Helper functions to update derived states without API calls
    const updateRecentTransactions = (budgetsData, expensesData) => {
      const expenses = expensesData
        .filter(
          (expense) =>
            expense.expenseAmount !== undefined && expense.expenseAmount !== null
        )
        .map((expense) => ({
          ...expense,
          type: "expense",
          category: expense.category || expense.expenseName || "Uncategorized",
          amount: parseFloat(expense.expenseAmount) || 0,
          date: expense.date || new Date().toISOString(),
          icon: expense.icon || "💸",
        }));

      const budgets = budgetsData
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
          icon: budget.icon || "💰",
        }));

      const allTransactions = [...expenses, ...budgets];
      const sortedTransactions = allTransactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentTransactions(sortedTransactions);
      console.log("Updated Recent Transactions:", sortedTransactions);
    };

    const updateLast30DaysExpenses = (expensesData) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredExpenses = expensesData
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

      const sortedExpenses = filteredExpenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setLast30DaysExpenses(sortedExpenses);

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
        key: `chart-bar-${index}`,
      }));
      setLast30DaysChartData(chartData);
    };

    const updateLast60DaysBudgets = (budgetsData) => {
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const filteredBudgets = budgetsData
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

      const sortedBudgets = filteredBudgets.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setLast60DaysBudgets(sortedBudgets);

      const categoryTotals = {};
      filteredBudgets.forEach((budget) => {
        const category = budget.category;
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
        categoryTotals[category] += budget.amount;
      });

      const categoryColors = {
        Salary: "#6b48ff",
        "Interest from Savings": "#ff4d4f",
        "E-commerce Sales": "#ff7a45",
        "Graphic Design": "#1890ff",
        "Affiliate Marketing": "#13c2c2",
        Budget: "#13c2c2",
      };

      const chartData = Object.keys(categoryTotals).map((category, index) => ({
        name: category,
        value: categoryTotals[category],
        color:
          categoryColors[category] ||
          `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }));
      setLast60DaysIncomeChartData(chartData);
    };

    const addBudget = async (budgetData) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/budgets",
          budgetData
        );
        const newBudget = response.data;
        const updatedBudgets = [...budgets, newBudget];
        setBudgets(updatedBudgets);
        setTotalBudget(
          (prev) => prev + (parseFloat(newBudget.budgetAmount) || 0)
        );
        updateRecentTransactions(updatedBudgets, expenses);
        updateLast60DaysBudgets(updatedBudgets);
        return newBudget;
      } catch (error) {
        console.error("Error adding budget:", error);
        throw error;
      }
    };

    const editBudget = async (id, budgetData) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/budgets/${id}`,
          budgetData
        );
        const updatedBudget = response.data;
        const updatedBudgets = budgets.map((budget) =>
          budget.id === id ? updatedBudget : budget
        );
        setBudgets(updatedBudgets);
        const newTotal = updatedBudgets.reduce((sum, budget) => {
          const amount = parseFloat(budget.budgetAmount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
        setTotalBudget(newTotal);
        updateRecentTransactions(updatedBudgets, expenses);
        updateLast60DaysBudgets(updatedBudgets);
        return updatedBudget;
      } catch (error) {
        console.error("Error editing budget:", error);
        throw error;
      }
    };

    const deleteBudget = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/budgets/${id}`);
        const updatedBudgets = budgets.filter((budget) => budget.id !== id);
        setBudgets(updatedBudgets);
        const newTotal = updatedBudgets.reduce((sum, budget) => {
          const amount = parseFloat(budget.budgetAmount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
        setTotalBudget(newTotal);
        updateRecentTransactions(updatedBudgets, expenses);
        updateLast60DaysBudgets(updatedBudgets);
      } catch (error) {
        console.error("Error deleting budget:", error);
        throw error;
      }
    };

    const addExpense = async (expenseData) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/expenses",
          expenseData
        );
        const newExpense = response.data;
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        setTotalExpenses(
          (prev) => prev + (parseFloat(newExpense.expenseAmount) || 0)
        );
        updateRecentTransactions(budgets, updatedExpenses);
        updateLast30DaysExpenses(updatedExpenses);
        return newExpense;
      } catch (error) {
        console.error("Error adding expense:", error);
        throw error;
      }
    };

    const deleteExpense = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/expenses/${id}`);
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);
        const newTotal = updatedExpenses.reduce((sum, expense) => {
          const amount = parseFloat(expense.expenseAmount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
        setTotalExpenses(newTotal);
        updateRecentTransactions(budgets, updatedExpenses);
        updateLast30DaysExpenses(updatedExpenses);
      } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
      }
    };

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
      () => ({
        totalBudget,
        totalExpenses,
        remainingBalance,
        recentTransactions,
        last30DaysExpenses,
        last30DaysChartData,
        last60DaysBudgets,
        last60DaysIncomeChartData,
        budgets,
        expenses,
        loading,
        addBudget,
        editBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }),
      [
        totalBudget,
        totalExpenses,
        remainingBalance,
        recentTransactions,
        last30DaysExpenses,
        last30DaysChartData,
        last60DaysBudgets,
        last60DaysIncomeChartData,
        budgets,
        expenses,
        loading
      ]
    );

    return (
      <BudgetContext.Provider value={contextValue}>
        {children}
      </BudgetContext.Provider>
    );
  };

  export const useBudget = () => useContext(BudgetContext);
