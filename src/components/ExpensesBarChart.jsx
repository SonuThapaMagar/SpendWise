import React from "react";
import { Card, Typography, Col, Empty } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell, // Import Cell component
} from "recharts";

const { Title } = Typography;

const ExpensesBarChart = ({ chartData }) => {
  // Add an index to the chart data to ensure unique keys and alternate colors
  const dataWithIndex = chartData.map((item, index) => ({
    ...item,
    index,
    key: `bar-${index}`, // Unique key for each bar
  }));

  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Last 30 Days Expenses
          </Title>
        }
        className="shadow-lg rounded-lg"
        style={{ minHeight: "380px" }}
      >
        <div style={{ height: "300px" }}>
          {dataWithIndex && dataWithIndex.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataWithIndex}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis tick={false} />
                <YAxis
                  tickFormatter={(value) => `Rs. ${value}`}
                  tick={{ fill: "#666" }}
                  domain={[0, 800]}
                />
                <Tooltip
                  formatter={(value) => [`Rs. ${value}`, "Amount"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar
                  dataKey="amount"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                  fillOpacity={0.9}
                >
                  {dataWithIndex.map((entry, index) => (
                    <Cell
                      key={entry.key} // Use the unique key
                      fill={index % 2 === 0 ? "#9061F9" : "#5850EC"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Empty
              description="No expenses data for the last 30 days"
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default ExpensesBarChart;