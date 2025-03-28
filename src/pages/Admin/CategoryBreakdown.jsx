import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useBudget } from "../../context API/BudgetContext";

const CategoryBreakdown = () => {
  const { expenses, loading } = useBudget();

  console.log("Expenses from Context:", expenses);

  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  console.log("Safe Expenses:", safeExpenses);

  const data = safeExpenses.reduce((acc, exp) => {
    const category = exp.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + parseFloat(exp.expenseAmount || 0);
    return acc;
  }, {});
  console.log("Aggregated Data:", data);

  const chartData = Object.keys(data).map((category) => ({
    name: category,
    value: data[category],
  }));
  console.log("Chart Data:", chartData);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name} (${value})`}
      </text>
    );
  };

  if (loading) return <div className="p-4 text-center text-gray-600">Loading...</div>;

  // Fallback if no data
  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Category Breakdown</h3>
        <div className="flex-1 min-h-[300px] flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Category Breakdown</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdown;