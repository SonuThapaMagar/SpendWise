import React from "react";
import { Card, Row, Col, Typography, List, Button, Avatar } from "antd";
import {
  DollarOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  CarOutlined,
  BulbOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useBudget } from "../../context API/BudgetContext";
const { Text, Title } = Typography;

const UserDashboard = () => {
  const navigate = useNavigate();
  const { totalBudget, totalExpenses, remainingBalance, recentExpenses } =
    useBudget();

  // Data for the donut chart
  const chartData = [
    {
      name: "Total Balance",
      value: remainingBalance,
      backgroundColor: "#6875F5",
    },
    { name: "Total Income", value: totalBudget, color: "#F5A623" },
    { name: "Total Expenses", value: totalExpenses, color: "#D9534F" },
  ];

  // Map categories to icons
  const categoryIcons = {
    Shopping: <ShoppingCartOutlined />,
    Travel: <CarOutlined />,
    Salary: <BankOutlined />,
    "Electricity Bill": <BulbOutlined />,
    "Loan Repayment": <CreditCardOutlined />,
    Uncategorized: <DollarOutlined />,
    Fashion: <ShoppingCartOutlined />, // Added for Fashion
    Household: <BankOutlined />, // Added for Household
    Education: <BulbOutlined />, // Added for Education
    Entertainment: <CarOutlined />, // Added for Entertainment
    Utilities: <CreditCardOutlined />, // Added for Utilities
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Financial Summary Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg rounded-lg p-4"
            style={{
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row align="middle">
              <Col span={6}>
                <Avatar
                  size={50}
                  icon={<WalletOutlined />}
                  style={{
                    backgroundColor: "#6875F5", // Purple for Total Balance
                  }}
                />
              </Col>
              <Col span={18}>
                <Text
                  className="text-gray-500 text-sm uppercase"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                >
                  Total Balance
                </Text>
                <Title
                  level={4}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    color: "#000",
                    margin: 0,
                    fontSize: "1.5rem",
                  }}
                >
                  Rs.{remainingBalance.toLocaleString()}
                </Title>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg rounded-lg p-4"
            style={{
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row align="middle">
              <Col span={6}>
                <Avatar
                  size={50}
                  icon={<DollarOutlined />}
                  style={{
                    backgroundColor: "#F5A623", // Orange for Total Income
                  }}
                />
              </Col>
              <Col span={18}>
                <Text
                  className="text-gray-500 text-sm uppercase"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                >
                  Total Income
                </Text>
                <Title
                  level={4}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    color: "#000",
                    margin: 0,
                    fontSize: "1.5rem",
                  }}
                >
                  Rs.{totalBudget.toLocaleString()}
                </Title>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg rounded-lg p-4"
            style={{
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row align="middle">
              <Col span={6}>
                <Avatar
                  size={50}
                  icon={<DollarOutlined />}
                  style={{
                    backgroundColor: "#D9534F", // Red for Total Expenses
                  }}
                />
              </Col>
              <Col span={18}>
                <Text
                  className="text-gray-500 text-sm uppercase"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300 }}
                >
                  Total Expenses
                </Text>
                <Title
                  level={4}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    color: "#000",
                    margin: 0,
                    fontSize: "1.5rem",
                  }}
                >
                  Rs.{totalExpenses.toLocaleString()}
                </Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions and Financial Overview */}
      <Row gutter={[16, 16]}>
        {/* Recent Transactions */}
        <Col xs={24} md={16}>
          <Card
            title={
              <Title level={4} className="m-0">
                Recent Transactions
              </Title>
            }
            extra={
              <Button
                type="link"
                onClick={() => navigate("/users/expense")}
                style={{
                  backgroundColor: "#CDDBFE",
                  color: "#5850EC",
                }}
              >
                See All
              </Button>
            }
            className="shadow-lg rounded-lg"
          >
            <List
              dataSource={recentExpenses}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          categoryIcons[item.category] || <DollarOutlined />
                        }
                        className={
                          item.category === "Salary"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      />
                    }
                    title={item.category}
                    description={new Date(item.date).toLocaleDateString()}
                  />
                  <Text
                    className={
                      item.category === "Salary"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.category === "Salary"
                      ? `+Rs.${item.expenseAmount.toLocaleString()}`
                      : `-Rs.${item.expenseAmount.toLocaleString()}`}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Financial Overview */}
        <Col xs={24} md={8}>
          <Card
            title={
              <Title level={4} className="m-0">
                Financial Overview
              </Title>
            }
            className="shadow-lg rounded-lg"
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
                  formatter={(value) => (
                    <span style={{ marginRight: 10 }}>{value}</span>
                  )} // Add spacing
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg font-semibold"
                >
                  Rs.{remainingBalance.toLocaleString()}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
