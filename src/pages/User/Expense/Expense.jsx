import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Card,
  Flex,
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify.util";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
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
import * as XLSX from "xlsx";

const { Title, Text } = Typography;

const Expense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Transform expenses data for the chart
  const prepareChartData = () => {
    const dailyExpenses = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date] += expense.expenseAmount;
      return acc;
    }, {});

    return Object.keys(dailyExpenses).map((date) => ({
      date,
      amount: dailyExpenses[date],
    }));
  };

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

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        "Expense Name": expense.expenseName,
        Amount: `Rs. ${expense.expenseAmount}`,
        Category:
          budgets.find((b) => b.id === expense.budgetId)?.budgetName || "N/A",
        Date: new Date(expense.date).toLocaleDateString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  
  const chartData = prepareChartData();

  const columns = [
    {
      title: "Category",
      dataIndex: "budgetId",
      key: "category",
      render: (budgetId, record) => {
        const budget = budgets.find((b) => b.id === budgetId);
        return (
          <div>
            <Tag
              color="#7288fa"
              style={{ fontSize: "1rem", padding: "4px 8px" }}
            >
              {budget ? budget.budgetName : "N/A"}
            </Tag>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary">
                {new Date(record.date).toLocaleDateString()}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: "1rem" }}>
            {record.expenseName}
          </Text>
          <div>
            <Text type="danger" strong style={{ fontSize: "1.1rem" }}>
              Rs. {record.expenseAmount}
            </Text>
          </div>
        </div>
      ),
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
      {/* Header with Title and Buttons */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          All Expenses
        </Title>
        <Flex gap={12}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            // onClick={handleAddExpense}
            style={{ backgroundColor: "#7288fa" }}
          >
            Add Expense
          </Button>
        </Flex>
      </Flex>

      {/* Chart Section */}
      <Card style={{ marginTop: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Expense Trends
        </Title>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fill: "#666" }} tickMargin={10} />
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

      {/* Expenses List Below the Chart */}
      <Card style={{ marginTop: 24 }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Title level={4} style={{ marginBottom: 16 }}>
            Recent Expenses
          </Title>
          <Flex gap={12}>
            <Button
              icon={<DownloadOutlined />}
              size="large"
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
          </Flex>
        </Flex>

        <Table
          dataSource={expenses}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{ marginTop: 16 }}
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
