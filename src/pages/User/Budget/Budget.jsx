import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  ConfigProvider,
  Flex,
  Card,
  Row,
  Col,
  Statistic,
  Divider,
  Progress,
} from "antd";
import { useResponsive } from "antd-style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PlusOutlined,
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  HomeOutlined,
  CarOutlined,
  
} from "@ant-design/icons";
import { IoIosRestaurant } from "react-icons/io";



const { Title, Text } = Typography;

const Budget = () => {
  const { md, sm } = useResponsive();
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Icon mapping for different budget categories
  const categoryIcons = {
    Groceries: <ShoppingOutlined />,
    Rent: <HomeOutlined />,
    Transportation: <CarOutlined />,
    "Dining Out": <IoIosRestaurant  />,
    default: <WalletOutlined />,
  };

  // Gradient backgrounds for cards
  const cardBackgrounds = [
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
    "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
    "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
    "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
  ];

  // Sample data to match your image
  const sampleBudgets = [
    { id: 1, budgetName: "Groceries", budgetAmount: 15000 },
    { id: 2, budgetName: "Rent", budgetAmount: 25000 },
    { id: 3, budgetName: "Transportation", budgetAmount: 8000 },
    { id: 4, budgetName: "Dining Out", budgetAmount: 10000 },
  ];

  const sampleExpenses = [
    { id: 1, budgetId: 1, expenseAmount: 5000 },
    { id: 2, budgetId: 2, expenseAmount: 25000 },
    { id: 3, budgetId: 3, expenseAmount: 3000 },
    { id: 4, budgetId: 4, expenseAmount: 2500 },
  ];

  // Fetch data from the server (commented out to use sample data)
  useEffect(() => {
    // fetchBudgets();
    // fetchExpenses();
    setBudgets(sampleBudgets);
    setExpenses(sampleExpenses);
  }, []);

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => setBudgets(response.data))
      .catch((error) => console.log(error));
  };

  const fetchExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log(error));
  };

  // Calculate total expenses per budget
  const getBudgetExpenses = (budgetId) => {
    return expenses
      .filter((expense) => expense.budgetId === budgetId)
      .reduce((sum, expense) => sum + (expense.expenseAmount || 0), 0);
  };

  const handleAddBudget = () => navigate("/users/budget/addBudget");
  const handleAddExpense = (budgetId) =>
    navigate(`/users/expenses/addExpense/${budgetId}`);

  // Format currency with commas
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <div style={{ padding: md ? 24 : 12 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          {/* <WalletOutlined style={{ marginRight: 8 }} /> */}
          Income Overview
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddBudget}
          size={md ? "large" : "middle"}
          style={{ borderRadius: 6 }}
        >
          Add Budget
        </Button>
      </Flex>

      <ConfigProvider componentSize={md ? "middle" : "small"}>
        {/* Budget Cards Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {budgets.map((budget, index) => {
            const spentAmount = getBudgetExpenses(budget.id);
            const remaining = budget.budgetAmount - spentAmount;
            const percentageSpent = (spentAmount / budget.budgetAmount) * 100;
            const bgIndex = index % cardBackgrounds.length;
            const icon =
              categoryIcons[budget.budgetName] || categoryIcons["default"];

            return (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={budget.id}>
                <Card
                  variant={false}
                  style={{
                    borderRadius: 12,
                    background: cardBackgrounds[bgIndex],
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  stylesbody ={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Flex justify="space-between" align="center">
                    <Flex align="center">
                      <div
                        style={{
                          fontSize: 20,
                          marginRight: 8,
                          color: percentageSpent > 80 ? "#ff4d4f" : "#1890ff",
                        }}
                      >
                        {icon}
                      </div>
                      <Title level={5} style={{ margin: 0 }}>
                        {budget.budgetName}
                      </Title>
                    </Flex>
                    <Button
                      type="text"
                      shape="circle"
                      size="small"
                      onClick={() => handleAddExpense(budget.id)}
                      icon={<PlusOutlined style={{ color: "#1890ff" }} />}
                    />
                  </Flex>

                  <Divider style={{ margin: "12px 0" }} />

                  <Flex vertical gap={12} style={{ flex: 1 }}>
                    <Statistic
                      title={
                        <Text strong>
                          <WalletOutlined style={{ marginRight: 6 }} />
                          Total Budget
                        </Text>
                      }
                      value={formatCurrency(budget.budgetAmount)}
                      prefix="Rs."
                      valueStyle={{ fontSize: md ? 18 : 16 }}
                    />

                    <Statistic
                      title={
                        <Text strong>
                          <ArrowUpOutlined
                            style={{ marginRight: 6, color: "#cf1322" }}
                          />
                          Spent
                        </Text>
                      }
                      value={formatCurrency(spentAmount)}
                      prefix="Rs."
                      valueStyle={{ fontSize: md ? 16 : 14, color: "#cf1322" }}
                    />

                    <Statistic
                      title={
                        <Text strong>
                          <ArrowDownOutlined
                            style={{ marginRight: 6, color: "#389e0d" }}
                          />
                          Remaining
                        </Text>
                      }
                      value={formatCurrency(remaining)}
                      prefix="Rs."
                      valueStyle={{ fontSize: md ? 16 : 14, color: "#389e0d" }}
                    />

                    <div style={{ marginTop: "auto" }}>
                      <Flex justify="space-between" align="center">
                        <Text type="secondary">
                          <PieChartOutlined style={{ marginRight: 4 }} />
                          {percentageSpent.toFixed(1)}% spent
                        </Text>
                        <Text type="secondary">
                          Rs. {formatCurrency(remaining)} left
                        </Text>
                      </Flex>
                      <Progress
                        percent={percentageSpent}
                        strokeColor={
                          percentageSpent > 80 ? "#ff4d4f" : "#1890ff"
                        }
                        trailColor="#f0f0f0"
                        showInfo={false}
                        size={6}
                      />
                    </div>

                    <Button
                      type="primary"
                      block
                      onClick={() => handleAddExpense(budget.id)}
                      icon={<PlusOutlined />}
                      size={sm ? "middle" : "small"}
                    >
                      Add Expense
                    </Button>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>
      </ConfigProvider>
    </div>
  );
};

export default Budget;
