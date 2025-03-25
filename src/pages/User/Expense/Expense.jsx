import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Flex,
  Tag,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import {
  PlusOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons";
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
const { Option } = Select;

const Expense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [addExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("💰");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Rent",
    "Groceries",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Dining Out",
    "Healthcare",
    "Education",
    "Other",
  ];

  // Data fetching
  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      message.error("Failed to fetch expenses");
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      message.error("Failed to fetch budgets");
    }
  };

  // Expense CRUD operations
  const handleAddExpense = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/expenses", {
        ...values,
        expenseName: values.category, // Using category as name for now
        expenseAmount: values.amount,
        date: values.date.format("YYYY-MM-DD"), // Format date for backend
        icon: selectedEmoji,
      });

      setExpenses([...expenses, response.data]);
      message.success("Expense added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding expense:", error);
      message.error("Failed to add expense");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      message.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      message.error("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const showDeleteModal = (id) => {
    setExpenseToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (expenseToDelete) {
      await handleDeleteExpense(expenseToDelete);
      setDeleteModalVisible(false);
      setExpenseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setExpenseToDelete(null);
  };

  const showAddExpenseModal = () => {
    setAddExpenseModalVisible(true);
  };

  const handleAddExpenseSubmit = async () => {
    try {
      const values = await form.validateFields();
      const success = await handleAddExpense(values);

      if (success) {
        form.resetFields();
        setAddExpenseModalVisible(false);
        setSelectedEmoji("💰"); // Reset to default emoji
      }
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  const handleAddExpenseCancel = () => {
    form.resetFields();
    setAddExpenseModalVisible(false);
    setSelectedEmoji("💰");
  };

  // Emoji picker
  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    form.setFieldsValue({ icon: emojiData.emoji });
    setEmojiPickerVisible(false);
  };

  // Other functions
  const handleEditExpense = (id) => {
    navigate(`/users/expense/editExpense/${id}`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        "Expense Name": expense.expenseName,
        Amount: `Rs. ${expense.expenseAmount}`,
        Category:
          budgets.find((b) => b.id === expense.budgetId)?.budgetName || "N/A",
        Date: new Date(expense.date).toLocaleDateString(),
        Icon: expense.icon,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

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

  const chartData = prepareChartData();

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
            onClick={showAddExpenseModal}
            style={{ backgroundColor: "#7288fa" }}
            loading={loading}
          >
            Add Expense
          </Button>
        </Flex>
      </Flex>

      {/* Add Expense Modal */}
      <Modal
        title="Add Expense"
        open={addExpenseModalVisible}
        onOk={handleAddExpenseSubmit}
        onCancel={handleAddExpenseCancel}
        okText="Add Expense"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" name="add_expense_form">
          <div style={{ marginBottom: "16px" }}>
            <Button
              icon={<SmileOutlined />}
              onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
              style={{
                background: "#F3E8FF",
                color: "#6C4AB6",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            >
              {selectedEmoji}
            </Button>
            {emojiPickerVisible && (
              <div style={{ position: "absolute", zIndex: 10 }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount" }]}
          >
            <Input type="number" prefix="Rs." />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

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

      {/* Expenses List */}
      <Card style={{ marginTop: 24 }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Title level={4}>Recent Expenses</Title>
          <Button
            icon={<DownloadOutlined />}
            size="large"
            onClick={exportToExcel}
            loading={loading}
          >
            Export to Excel
          </Button>
        </Flex>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {expenses.map((expense) => {
            const formattedDate = new Date(expense.date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <Col xs={24} sm={12} key={expense.id}>
                <Card
                  variant={false}
                  style={{
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                    marginBottom: 8,
                  }}
                  stylesbody={{ padding: "16px" }}
                >
                  <Flex justify="space-between" align="center">
                    <Flex
                      align="center"
                      gap={16}
                      style={{ flex: 1, minWidth: 0 }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          backgroundColor: "#F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          flexShrink: 0,
                        }}
                      >
                        {expense.icon || "💰"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          strong
                          style={{
                            display: "block",
                            fontSize: 16,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {expense.expenseName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {formattedDate}
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="center" gap={8}>
                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: "#EF4444",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ${expense.expenseAmount}
                      </Text>
                      <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={(e) => {
                          e.stopPropagation();
                          showDeleteModal(expense.id);
                        }}
                        loading={loading && expenseToDelete === expense.id}
                        style={{ marginLeft: 8 }}
                      />
                    </Flex>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
    </div>
  );
};

export default Expense;
