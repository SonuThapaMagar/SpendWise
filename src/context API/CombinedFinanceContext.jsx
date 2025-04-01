import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useBudget } from "./BudgetContext";
import { useExpense } from "./ExpenseContext";

const CombinedFinanceContext = createContext();

export const CombinedFinanceProvider = ({ children }) => {
  const budgetContext = useBudget();
  const expenseContext = useExpense();

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate derived values whenever budgets or expenses change
  useEffect(() => {
    if (budgetContext.budgets && expenseContext.expenses) {
      updateFinancialData();
    }
  }, [budgetContext.budgets, expenseContext.expenses]);

  const updateFinancialData = () => {
    try {
      setLoading(true);

      // Calculate totals
      const budgetTotal = budgetContext.budgets.reduce((sum, budget) => {
        const amount = parseFloat(budget.budgetAmount);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      setTotalBudget(budgetTotal);

      const expenseTotal = expenseContext.expenses.reduce((sum, expense) => {
        const amount = parseFloat(expense.expenseAmount);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      setTotalExpenses(expenseTotal);

      setRemainingBalance(budgetTotal - expenseTotal);

      // Update derived states
      updateDerivedStates(budgetContext.budgets, expenseContext.expenses);
    } catch (error) {
      console.error("Error updating financial data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDerivedStates = (budgetsData, expensesData) => {
    updateRecentTransactions(budgetsData, expensesData);
    updateLast30DaysExpenses(expensesData);
    updateLast60DaysBudgets(budgetsData);
  };

  const updateRecentTransactions = (budgetsData, expensesData) => {
    const expensesMapped = expensesData.map((expense) => ({
      ...expense,
      type: "expense",
      category: expense.category || expense.expenseName || "Uncategorized",
      amount: parseFloat(expense.expenseAmount) || 0,
      date: expense.date || new Date().toISOString(),
      icon: expense.icon || "💸",
    }));

    const budgetsMapped = budgetsData.map((budget) => ({
      ...budget,
      type: "budget",
      category: budget.budgetName || "Budget",
      amount: parseFloat(budget.budgetAmount) || 0,
      date: budget.date || new Date().toISOString(),
      icon: budget.icon || "💰",
    }));

    const allTransactions = [...expensesMapped, ...budgetsMapped]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    setRecentTransactions(allTransactions);
  };

  const updateLast30DaysExpenses = (expensesData) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filteredExpenses = expensesData
      .filter((expense) => new Date(expense.date) >= thirtyDaysAgo)
      .map((expense) => ({
        ...expense,
        category: expense.category || expense.expenseName || "Uncategorized",
        amount: parseFloat(expense.expenseAmount) || 0,
        date: expense.date || new Date().toISOString(),
        icon: expense.icon || "💸",
      }));

    setLast30DaysExpenses(filteredExpenses);

    const dailyExpenses = {};
    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      dailyExpenses[date] = (dailyExpenses[date] || 0) + expense.amount;
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
      .filter((budget) => new Date(budget.date) >= sixtyDaysAgo)
      .map((budget) => ({
        ...budget,
        category: budget.budgetName || "Budget",
        amount: parseFloat(budget.budgetAmount) || 0,
        date: budget.date || new Date().toISOString(),
        icon: budget.icon || "💰",
      }));

    setLast60DaysBudgets(filteredBudgets);

    const categoryTotals = {};
    filteredBudgets.forEach((budget) => {
      const category = budget.category;
      categoryTotals[category] =
        (categoryTotals[category] || 0) + budget.amount;
    });

    const chartData = Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
    setLast60DaysIncomeChartData(chartData);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      // Refresh budgets and expenses
      await Promise.all([budgetContext.refreshBudgets(), expenseContext.refreshExpenses()]);
      // useEffect  trigger updateFinancialData when budgets/expenses change
    } catch (error) {
      console.error("Error refreshing data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Combine all context values
  const contextValue = useMemo(
    () => ({
      // Calculated values
      totalBudget,
      totalExpenses,
      remainingBalance,
      recentTransactions,
      last30DaysExpenses,
      last30DaysChartData,
      last60DaysBudgets,
      last60DaysIncomeChartData,

      // Raw data
      budgets: budgetContext.budgets,
      expenses: expenseContext.expenses,

      // Loading states
      loading: budgetContext.loading || expenseContext.loading || loading,
      error: budgetContext.error || expenseContext.error || error,

      // Budget methods
      addBudget: budgetContext.addBudget,
      updateBudget: budgetContext.updateBudget,
      deleteBudget: budgetContext.deleteBudget,

      // Expense methods
      addExpense: expenseContext.addExpense,
      deleteExpense: expenseContext.deleteExpense,

      // Refresh functions
      refreshBudgets: budgetContext.refreshBudgets,
      refreshExpenses: expenseContext.refreshExpenses,
      refreshData,
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
      budgetContext,
      expenseContext,
      loading,
      error,
      refreshData,
    ]
  );

  return (
    <CombinedFinanceContext.Provider value={contextValue}>
      {children}
    </CombinedFinanceContext.Provider>
  );
};

export const useCombinedFinance = () => useContext(CombinedFinanceContext);
