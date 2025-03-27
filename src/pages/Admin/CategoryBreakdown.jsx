import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from 'antd';

const CategoryBreakdown = () => {
  const data = [
    { name: 'Food', value: 500 },
    { name: 'Rent', value: 800 },
    { name: 'Utilities', value: 300 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="chart-container">
      <Card title="Category Breakdown">
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>
    </div>
  );
};

export default CategoryBreakdown;