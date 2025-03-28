import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { useBudget } from "../../context API/BudgetContext";

const ExpenseTrends = () => {
  const { expenses, loading } = useBudget();

  console.log("Expenses from BudgetContext:", expenses);
  console.log("Loading state:", loading);

  const monthlyAverages = () => {
    if (!expenses || expenses.length === 0) {
      console.log("No expenses data available");
      return [];
    }

    const monthlyTotals = {};
    const monthlyCounts = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthYear = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const amount = parseFloat(expense.expenseAmount) || 0;
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
        monthlyCounts[monthYear] = 0;
      }
      monthlyTotals[monthYear] += amount;
      monthlyCounts[monthYear] += 1;
    });

    const data = Object.keys(monthlyTotals).map((monthYear) => ({
      month: monthYear,
      averageExpenses: monthlyTotals[monthYear] / monthlyCounts[monthYear],
    }));

    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });

    console.log("Processed Chart Data:", sortedData);
    return sortedData;
  };

  const chartData = monthlyAverages();

  console.log("Chart Data Length:", chartData.length);
  console.log("Rendering Data:", chartData);

  if (loading) {
    console.log("Rendering loading state");
    return <div>Loading expenses...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Average Monthly Expense Trends
      </h3>
      <div className="flex-1" style={{ minHeight: "300px" }}>
        {chartData.length === 0 ? (
          <p>No data available to display</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="averageExpenses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseTrends;