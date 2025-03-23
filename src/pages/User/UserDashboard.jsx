import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Table } from "antd";
import axios from "axios";
import ExpenseGraph from "./ExpenseGraph";

const { Title, Text } = Typography;

const Dashboard = () => {
  // const [budgets, setBudgets] = useState([]);

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchTotalBudget();
    fetchTotalExpenses();
    fetchExpensesByCategory();
    fetchRecentExpenses();
    fetchBudgets();
  }, []);

  const fetchTotalBudget = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        const totalBudget = response.data.reduce(
          (sum, budget) => sum + budget.budgetAmount,
          0
        );
        setTotalBudget(totalBudget);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  const fetchTotalExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        const totalExpenses = response.data.reduce(
          (sum, expense) => sum + (expense.expenseAmount || 0),
          0
        );
        setTotalExpenses(totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };
  // Calculate remaining balance whenever totalBudget or totalExpenses changes
  useEffect(() => {
    setRemainingBalance(totalBudget - totalExpenses);
  }, [totalBudget, totalExpenses]);

  const fetchExpensesByCategory = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        const groupedExpenses = response.data.reduce((acc, expense) => {
          const category = expense.category || "Uncategorized"; // Fallback for missing category
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += expense.expenseAmount;
          return acc;
        }, {});

        // Convert the grouped object into an array for the bar graph
        const expensesByCategoryArray = Object.keys(groupedExpenses).map(
          (category) => ({
            category,
            amount: groupedExpenses[category],
          })
        );

        setExpensesByCategory(expensesByCategoryArray);
      })
      .catch((error) => {
        console.error("Error fetching expenses by category:", error);
      });
  };

  const fetchRecentExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        const expensesWithCategory = response.data.map((expense) => {
          const budget = budgets.find((b) => b.id === expense.budgetId);
          return {
            ...expense,
            category: budget ? budget.budgetName : "Uncategorized",
          };
        });
        // Sort expenses by date (if date field is available)
        const sortedExpenses = expensesWithCategory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const recentExpenses = sortedExpenses.slice(0, 5);
        setRecentExpenses(recentExpenses);
      })
      .catch((error) => {
        console.error("Error fetching recent expenses:", error);
      });
  };

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  // Define columns for the recent expenses table
  const recentExpensesColumns = [
    {
      title: "Expense Name",
      dataIndex: "expenseName",
      key: "expenseName",
    },
    {
      title: "Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(), // Format the date
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1
        style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}
      >
        Dashboard
      </h1>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="Total Budget"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text
              style={{ fontSize: "24px", fontWeight: "bold", color: "#52c41a" }}
            >
              Rs. {totalBudget}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="Total Expenses"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text
              style={{ fontSize: "24px", fontWeight: "bold", color: "#ff4d4f" }}
            >
              Rs. {totalExpenses}
            </Text>
          </Card>
        </Col>

        {/* Remaining Balance Card */}
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card
            title="Remaining Balance"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text
              style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}
            >
              Rs. {remainingBalance}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Bar Graph for Expenses by Category */}
      <Card
        title="Expenses by Category"
        style={{
          marginBottom: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ExpenseGraph data={expensesByCategory} />
      </Card>

      {/* Recent Expenses Table */}
      <Card
        title="Recent Expenses"
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table
          dataSource={recentExpenses}
          columns={recentExpensesColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
