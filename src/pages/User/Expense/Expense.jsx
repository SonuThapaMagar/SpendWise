import React, { useEffect, useState } from "react";
import { Typography, Table, Button, Modal, Row, Col, Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify.util";
import { PlusOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;

const Expense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Transform expenses data for the chart
  const prepareChartData = () => {
    // Group expenses by date and sum amounts
    const dailyExpenses = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.expenseAmount;
      return acc;
    }, {});

    // Convert to array format for Recharts
    return Object.keys(dailyExpenses).map((date) => ({
      date,
      amount: dailyExpenses[date],
    }));
  };

  const chartData = prepareChartData();

  // Rest of your component logic remains the same...
  const showModal = (id) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (expenseToDelete) {
      axios
        .delete(`http://localhost:4000/expenses/${expenseToDelete}`)
        .then(() => {
          fetchExpenses();
          showSuccessToast("Expense deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting expense:", error);
          showErrorToast("Failed to delete expense.");
        })
        .finally(() => {
          setIsModalOpen(false);
          setExpenseToDelete(null);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setExpenseToDelete(null);
  };

  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditExpense = (id) => {
    navigate(`/users/expense/editExpense/${id}`);
  };

  const handleAddExpense = () => {
    navigate("/users/expense/addExpense");
  };

  const columns = [
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
      title: "Budget",
      dataIndex: "budgetId",
      key: "budgetId",
      render: (budgetId) => {
        const budget = budgets.find((b) => b.id === budgetId);
        return budget ? budget.budgetName : "N/A";
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, item) => (
        <Flex gap="small">
          <Button size="small" onClick={() => handleEditExpense(item.id)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => showModal(item.id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Title and Add Expense Button in the same row */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Expense Overview
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </Row>

      <Text type="secondary">
        Track your spending trends over time and gain insights into where your
        money goes
      </Text>

      {/* Chart Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={18}>
          <Card>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#666" }}
                    tickMargin={10}
                  />
                  <YAxis
                    tickFormatter={(value) => `Rs. ${value}`}
                    tick={{ fill: "#666" }}
                  />
                  <Tooltip
                    formatter={(value) => [`Rs. ${value}`, "Amount"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Expenses List */}
      <Card style={{ marginTop: 24 }}>
        <Table
          dataSource={expenses}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
    </div>
  );
};

export default Expense;
