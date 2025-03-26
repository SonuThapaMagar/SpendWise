import React from "react";
import { Card, Col, Typography } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const { Title } = Typography;

const FinancialOverview = ({ chartData, remainingBalance }) => {
  return (
    <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column" }}>
      <Card
        title={
          <Title level={4} className="m-0">
            Financial Overview
          </Title>
        }
        className="shadow-lg rounded-lg"
        style={{
          minHeight: "380px",
          flex: 1, // Ensure the card stretches to fill available space
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            flex: 1, // Ensure the card body takes up remaining space
            display: "flex",
            flexDirection: "column",
            padding: "16px", // Consistent padding
            position: "relative", // Allow absolute positioning of the overlay
          },
        }}
      >
        <div style={{ flex: 1, minHeight: "300px", maxHeight: "300px", position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
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
                formatter={(value) => (
                  <span style={{ marginRight: 10, fontSize: "12px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Overlay for Total Balance text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none", // Prevent interference with chart interactions
            }}
          >
            <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
              Total Balance
            </div>
            <div style={{ fontSize: "18px", color: "#000", fontWeight: 600 }}>
              Rs.{remainingBalance.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default FinancialOverview;