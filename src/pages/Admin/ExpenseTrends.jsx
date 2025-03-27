import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseTrends = () => {
  const data = [
    { month: 'Jan', expenses: 1200 },
    { month: 'Feb', expenses: 1500 },
    { month: 'Mar', expenses: 1300 },
  ];

  return (
    <div className="chart-container">
      <h3>Expense Trends</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;