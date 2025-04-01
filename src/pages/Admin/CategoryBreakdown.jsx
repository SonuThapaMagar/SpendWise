import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAdmin } from "../../context API/admin.context";

const CategoryBreakdown = () => {
  const { metrics, loading } = useAdmin();

  // Process expense data from admin context
  const safeExpenses = Array.isArray(metrics.topExpenses)
    ? metrics.topExpenses
    : [];

  // Aggregate expenses by category
  const categoryData = safeExpenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    const amount = parseFloat(expense.expenseAmount) || 0;
    if (amount > 0) {
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {});

  // Format for chart
  const chartData = Object.keys(categoryData)
    .map((category) => ({
      name: category,
      value: parseFloat(categoryData[category]),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value); // Sort by value descending

  // Color palette
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#A4DE6C",
    "#D0ED57",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
  ];

  // Custom label formatter
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Category Breakdown
        </h3>
        <div className="flex-1 min-h-[300px] flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Category Breakdown
      </h3>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `Rs.${value.toFixed(2)}`,
                props.payload.name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
