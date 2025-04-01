import React, { useMemo, useState, useEffect } from "react";
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
} from "antd";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SmileOutlined,
  EditOutlined,
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
import { useExpense } from "../../../context API/ExpenseContext";
import { useBudget } from "../../../context API/BudgetContext";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify.util";

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
  const { budgets } = useBudget();
  const {
    expenses,
    loading: contextLoading,
    addExpense,
    deleteExpense,
  } = useExpense();

  const [form] = Form.useForm();
  const [state, setState] = useState({
    modalType: null, // 'add', 'edit', or 'delete'
    expenseId: null,
    emoji: "💰",
    emojiPickerVisible: false,
  });

  useEffect(() => {
    console.log("Expenses data:", expenses);
    console.log("Loading state:", contextLoading);
  }, [expenses, contextLoading]);

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

  const handleAddExpense = async (values) => {
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
      handleModal(null);
      form.resetFields();
    } catch (error) {
      showErrorToast("Failed to add expense");
    }
  };

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(state.expenseId);
      showSuccessToast("Expense deleted successfully!");
      handleModal(null);
    } catch (error) {
      showErrorToast("Failed to delete expense");
    }
  };

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

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <Title level={3} className="m-0 text-xl md:text-2xl">
          Expense Overview
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleModal("add")}
          size="large"
          style={{backgroundColor:"#7288fa",color:"white"}}
          // className="bg-[#7288fa] rounded-lg w-full md:w-auto"
          loading={contextLoading}
        >
          Add Expense
        </Button>
      </div>

      <Card className="mb-6 rounded-lg shadow-sm">
        <Title level={4} className="mb-4 text-base md:text-lg">
          Expense Trends
        </Title>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#666", fontSize: 12 }}
                tickMargin={10}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(value) => `Rs. ${value}`}
                tick={{ fill: "#666", fontSize: 12 }}
                width={60}
              />
              <Tooltip
                formatter={(value) => [`Rs. ${value}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <Title level={4} className="m-0 text-base md:text-lg">
            Recent Expenses
          </Title>
          <Button
            type="button"
            className="border-gray-300 shadow-sm w-full md:w-auto"
            icon={<DownloadOutlined />}
            size="large"
            onClick={exportToExcel}
            loading={contextLoading}
          >
            Export to Excel
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          {expenses.map((expense) => (
            <Col xs={24} sm={12} key={expense.id}>
              <Card className="mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                      {expense.icon || "💰"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text
                        strong
                        className="block text-base whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {expense.expenseName}
                      </Text>
                      <Text type="secondary" className="text-sm">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        | {expense.category}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text
                      strong
                      className="text-base text-red-500 whitespace-nowrap"
                    >
                      Rs. {expense.expenseAmount}
                    </Text>
                    {/* <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleModal("edit", expense)}
                    /> */}
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleModal("delete", expense.id)}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Add/Edit Expense Modal */}
      <Modal
        title={state.modalType === "add" ? "Add New Expense" : "Edit Expense"}
        open={state.modalType === "add" || state.modalType === "edit"}
        onOk={(e) => {
          e.preventDefault();
          form
            .validateFields()
            .then(handleAddExpense)
            .catch((err) => console.log("Validation failed:", err));
        }}
        onCancel={() => handleModal(null)}
        okText={state.modalType === "add" ? "Add Expense" : "Save Changes"}
        confirmLoading={contextLoading}
        className="w-full max-w-md"
      >
        <Form
          form={form}
          layout="vertical"
          name="add_expense_form"
          onFinish={handleAddExpense}
        >
          <div className="mb-4">
            <Button
              icon={<SmileOutlined />}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  emojiPickerVisible: !prev.emojiPickerVisible,
                }))
              }
              className="bg-purple-100 text-purple-700 rounded-lg px-3 py-2"
            >
              {state.emoji}
            </Button>
            {state.emojiPickerVisible && (
              <div className="absolute z-10 w-full max-w-xs">
                <EmojiPicker
                  onEmojiClick={(emojiData) =>
                    setState((prev) => ({
                      ...prev,
                      emoji: emojiData.emoji,
                      emojiPickerVisible: false,
                    }))
                  }
                  width="100%"
                />
              </div>
            )}
          </div>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category" className="w-full">
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
            <Input
              type="number"
              prefix="Rs."
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              className="w-full"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={state.modalType === "delete"}
        onOk={handleDeleteExpense}
        onCancel={() => handleModal(null)}
        confirmLoading={contextLoading}
        className="w-full max-w-xs"
      >
        <p className="text-sm md:text-base">
          Are you sure you want to delete this expense?
        </p>
      </Modal>
    </div>
  );
});

export default Expense;