import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseTrends = () => {
  const data = [
    { month: "Jan", expenses: 1200 },
    { month: "Feb", expenses: 1500 },
    { month: "Mar", expenses: 1300 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Expense Trends</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrends;
