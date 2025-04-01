import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdmin } from "../../context API/admin.context";

const ExpenseTrends = () => {
  const { metrics, loading } = useAdmin();

  // Process data to get monthly averages from admin context
  const getMonthlyAverages = () => {
    const safeExpenses = Array.isArray(metrics.topExpenses)
      ? metrics.topExpenses
      : [];

    // 1. Group by month and calculate totals
    const monthlyData = safeExpenses.reduce((acc, expense) => {
      if (!expense.date) return acc;

      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const amount = parseFloat(expense.expenseAmount) || 0;

      if (!acc[monthYear]) {
        acc[monthYear] = { total: 0, count: 0 };
      }

      acc[monthYear].total += amount;
      acc[monthYear].count += 1;
      return acc;
    }, {});

    // 2. Calculate averages and format for chart
    return Object.keys(monthlyData)
      .map((monthYear) => {
        const [year, month] = monthYear.split("-");
        return {
          monthYear,
          name: new Date(year, month - 1).toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          average:
            monthlyData[monthYear].count > 0
              ? monthlyData[monthYear].total / monthlyData[monthYear].count
              : 0,
        };
      })
      .sort((a, b) => a.monthYear.localeCompare(b.monthYear)); // Sort chronologically
  };

  const chartData = getMonthlyAverages();

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Average Monthly Expense Trends
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Average Monthly Expense Trends
      </h3>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `Rs.${value.toFixed(0)}`} />
            <Tooltip
              formatter={(value) => [`Rs.${value.toFixed(2)}`, "Average"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="average"
              name="Average Expense"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrends;
