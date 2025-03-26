import React from "react";
import { Card, Col, Typography } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const { Title } = Typography;

const FinancialOverview = ({ chartData, remainingBalance }) => {
  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Financial Overview
          </Title>
        }
        className="shadow-lg rounded-lg"
        style={{ minHeight: "380px" }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              align="center"
              verticalAlign="bottom"
              layout="horizontal"
              iconType="circle"
              formatter={(value) => <span style={{ marginRight: 10 }}>{value}</span>}
            />
            <svg>
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-md font-medium"
                fill="#6B7280"
              >
                Total Balance
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xl font-semi-bold"
                fill="#000"
              >
                Rs.{remainingBalance.toLocaleString()}
              </text>
            </svg>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Col>
  );
};

export default FinancialOverview;