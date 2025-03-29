import React, { useMemo,useState } from "react";
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
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import {
  PlusOutlined,
  DownloadOutlined,
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
import { useBudget } from "../../../context API/BudgetContext";
import { showErrorToast,showSuccessToast } from "../../../utils/toastify.util";

const { Title, Text } = Typography;
const { Option } = Select;

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

const Expense = React.memo(() => {
  const navigate = useNavigate();
  const { addExpense, deleteExpense, expenses, budgets } = useBudget();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    modalType: null, // 'add' or 'delete'
    expenseId: null,
    emoji: "💰",
    emojiPickerVisible: false,
    loading: false,
  });

  // Unified modal handler
  const handleModal = (type, id = null) => {
    setState((prev) => ({
      ...prev,
      modalType: type,
      expenseId: type === "delete" ? id : null,
      emoji: type === "add" ? "💰" : prev.emoji,
      emojiPickerVisible: false,
    }));
    if (type === "add") form.resetFields();
  };

  // Handle expense addition
  const handleAddExpense = async (values) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const expenseData = {
        expenseName: values.category,
        expenseAmount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        category: values.category,
        icon: state.emoji,
      };
      await addExpense(expenseData);
      showSuccessToast("Expense added successfully!");
      handleModal(null); // Close modal
      form.resetFields();
    } catch (error) {
      showErrorToast("Failed to add expense");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle expense deletion
  const handleDeleteExpense = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await deleteExpense(state.expenseId);
      showSuccessToast("Expense deleted successfully!");
      handleModal(null); // Close modal
    } catch (error) {
      showErrorToast("Failed to delete expense");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Memoized chart data
  const chartData = useMemo(() => {
    const dailyExpenses = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + (parseFloat(expense.expenseAmount) || 0);
      return acc;
    }, {});
    return Object.entries(dailyExpenses).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [expenses]);

  // Memoized export data
  const exportData = useMemo(
    () =>
      expenses.map((expense) => ({
        "Expense Name": expense.expenseName,
        Amount: `Rs. ${expense.expenseAmount}`,
        Category:
          budgets.find((b) => b.id === expense.budgetId)?.budgetName || "N/A",
        Date: new Date(expense.date).toLocaleDateString(),
        Icon: expense.icon,
      })),
    [expenses, budgets]
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  // Reusable Expense Card component
  const ExpenseCard = React.memo(({ expense, onDelete }) => {
    const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return (
      <Col xs={24} sm={12}>
        <Card
          style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)", marginBottom: 8 }}
          stylesbody={{ padding: "16px" }}
        >
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={16} style={{ flex: 1, minWidth: 0 }}>
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
                style={{ fontSize: 16, color: "#EF4444", whiteSpace: "nowrap" }}
              >
                Rs. {expense.expenseAmount}
              </Text>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                danger
                onClick={onDelete}
                loading={state.loading && state.expenseId === expense.id}
              />
            </Flex>
          </Flex>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          All Expenses
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => handleModal("add")}
          style={{ backgroundColor: "#7288fa" }}
          loading={state.loading}
        >
          Add Expense
        </Button>
      </Flex>

      <Modal
        title="Add Expense"
        open={state.modalType === "add"}
        onOk={() => form.validateFields().then(handleAddExpense)}
        onCancel={() => handleModal(null)}
        okText="Add Expense"
        confirmLoading={state.loading}
      >
        <Form form={form} layout="vertical" name="add_expense_form">
          <Flex gap={16} style={{ marginBottom: 16 }}>
            <Button
              icon={<SmileOutlined />}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  emojiPickerVisible: !prev.emojiPickerVisible,
                }))
              }
              style={{
                background: "#F3E8FF",
                color: "#6C4AB6",
                borderRadius: 8,
                padding: "8px 12px",
              }}
            >
              {state.emoji}
            </Button>
            {state.emojiPickerVisible && (
              <div style={{ position: "absolute", zIndex: 10 }}>
                <EmojiPicker
                  onEmojiClick={(emojiData) =>
                    setState((prev) => ({ ...prev, emoji: emojiData.emoji, emojiPickerVisible: false }))
                  }
                />
              </div>
            )}
          </Flex>
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

      <Card style={{ marginTop: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Expense Trends
        </Title>
        <div style={{ height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
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

      <Card style={{ marginTop: 24 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
          <Title level={4}>Recent Expenses</Title>
          <Button
            icon={<DownloadOutlined />}
            size="large"
            onClick={exportToExcel}
            loading={state.loading}
          >
            Export to Excel
          </Button>
        </Flex>
        <Row gutter={[16, 16]}>
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={() => handleModal("delete", expense.id)}
            />
          ))}
        </Row>
      </Card>

      <Modal
        title="Confirm Deletion"
        open={state.modalType === "delete"}
        onOk={handleDeleteExpense}
        onCancel={() => handleModal(null)}
        confirmLoading={state.loading}
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
    </div>
  );
});

export default Expense;