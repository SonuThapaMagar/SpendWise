import React from "react";
import { Card, Typography, Col, Empty } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const { Title, Text } = Typography;

const Last60DaysBudgetChart = ({ chartData }) => {
  // Calculate total Budget
  const totalBudget = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Last 60 Days Budget
          </Title>
        }
        className="shadow-lg rounded-lg"
        style={{ minHeight: "380px" }}
      >
        <div style={{ height: "300px", position: "relative" }}>
          {chartData && chartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Text type="secondary" style={{ fontSize: "14px"}}>
                  Total Budget
                </Text>
                <br />
                <Title level={4} style={{ margin: 0, fontSize: "18px" }}>
                  Rs. {totalBudget.toLocaleString()}
                </Title>
              </div>
            </>
          ) : (
            <Empty
              description="No Budget data for the last 60 days"
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Last60DaysBudgetChart;