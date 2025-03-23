import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import Budget from "./Budget/Budget";
import axios from "axios";
import ExpenseGraph from "./ExpenseGraph";

const { Title, Text } = Typography;

const Dashboard = () => {
  // const [budgets, setBudgets] = useState([]);

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  // const [recentExpenses, setRecentExpenses] = useState([]);

  // Fetch budgets from the server
  // useEffect(() => {
  //   fetchBudgets();
  // }, []);

  useEffect(() => {
    fetchTotalBudget();
    fetchTotalExpenses();
    fetchExpensesByCategory();
    // fetchRecentExpenses();
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
          (sum, expense) => sum + expense.amount,
          0
        );
        setTotalExpenses(totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

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

  // const fetchBudgets = () => {
  //   axios
  //     .get("http://localhost:4000/budgets")
  //     .then((response) => {
  //       setBudgets(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching budgets:", error);
  //     });
  // };

  return (
    <div style={{ padding: "24px" }}>
      <h1
        style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}
      >
        Dashboard
      </h1>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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

      {/* Recent Expenses List */}
      {/* <Card
        title="Recent Expenses"
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <List
          dataSource={recentExpenses}
          renderItem={(expense) => (
            <List.Item>
              <List.Item.Meta
                title={expense.name}
                description={`Rs. ${expense.amount} - ${expense.category}`}
              />
              <Text type="secondary">
                {new Date(expense.date).toLocaleDateString()}
              </Text>
            </List.Item>
          )}
        />
      </Card> */}
      {/* <ExpenseGraph />
      <Budget /> */}
    </div>
  );
};

export default Dashboard;
