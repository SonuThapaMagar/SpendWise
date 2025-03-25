import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Card,
  Flex,
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
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;
const { Option } = Select;

const Budget = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [addBudgetModalVisible, setAddBudgetModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("💰");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Groceries",
    "Rent",
    "Transportation",
    "Dining Out",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Other",
  ];

  const accountTypes = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Digital Wallet",
    "Other",
  ];

  // Data fetching
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      message.error("Failed to fetch budgets");
    }
  };
  // Budget CRUD operations
  const handleAddBudget = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/budgets", {
        ...values,
        budgetName: values.budgetName,
        budgetAmount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        icon: selectedEmoji,
      });

      setBudgets([...budgets, response.data]);
      message.success("Budget added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding budget:", error);
      message.error("Failed to add budget");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/budgets/${id}`);
      setBudgets(budgets.filter((budget) => budget.id !== id));
      message.success("Budget deleted successfully!");
    } catch (error) {
      console.error("Error deleting budget:", error);
      message.error("Failed to delete budget");
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const showDeleteModal = (id) => {
    setBudgetToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (budgetToDelete) {
      await handleDeleteBudget(budgetToDelete);
      setDeleteModalVisible(false);
      setBudgetToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setBudgetToDelete(null);
  };

  const showAddBudgetModal = () => {
    setAddBudgetModalVisible(true);
  };

  const handleAddBudgetSubmit = async () => {
    try {
      const values = await form.validateFields();
      const success = await handleAddBudget(values);

      if (success) {
        form.resetFields();
        setAddBudgetModalVisible(false);
        setSelectedEmoji("💰");
      }
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  const handleAddBudgetCancel = () => {
    form.resetFields();
    setAddBudgetModalVisible(false);
    setSelectedEmoji("💰");
  };

  // Emoji picker
  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    form.setFieldsValue({ icon: emojiData.emoji });
    setEmojiPickerVisible(false);
  };

  // Other functions
  const handleEditBudget = (id) => {
    navigate(`/users/budget/editBudget/${id}`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      budgets.map((budget) => ({
        "Budget Name": budget.budgetName,
        Amount: `Rs. ${budget.budgetAmount}`,
        Category: budget.category,
        Date: new Date(budget.date).toLocaleDateString(),
        "Account Type": budget.accountType,
        Icon: budget.icon,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Budgets");
    XLSX.writeFile(workbook, "Budgets.xlsx");
  };

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Budget Overview
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddBudgetModal}
          size="large"
          style={{ borderRadius: 6, backgroundColor: "#7288fa" }}
          loading={loading}
        >
          Add Budget
        </Button>
      </Flex>

      {/* Bar Chart */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Budget Distribution
        </Title>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgets}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="budgetName" />
              <YAxis />
              <Tooltip formatter={(value) => `Rs. ${value}`} />
              <Bar dataKey="budgetAmount" fill="#7288fa" name="Budget Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Add Budget Modal */}
      <Modal
        title="Add New Budget"
        open={addBudgetModalVisible}
        onOk={handleAddBudgetSubmit}
        onCancel={handleAddBudgetCancel}
        confirmLoading={loading}
        okText="Add Budget"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_budget_form">
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
            name="budgetName"
            label="Budget Name"
            rules={[
              { required: true, message: "Please input the budget name" },
            ]}
          >
            <Input placeholder="Enter budget name" />
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
            name="accountType"
            label="Account Type"
            rules={[
              { required: true, message: "Please select an account type" },
            ]}
          >
            <Select placeholder="Select an account type">
              {accountTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* Budgets List */}
      <Card style={{ marginTop: 24 }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Title level={4}>Recent Budgets</Title>
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
          {budgets.map((budget) => {
            const formattedDate = new Date(budget.date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <Col xs={24} sm={12} key={budget.id}>
                <Card
                  style={{
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                    marginBottom: 8,
                  }}
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
                        {budget.icon || "💰"}
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
                          {budget.budgetName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                          {formattedDate} | {budget.category}
                        </Text>
                      </div>
                    </Flex>
                    <Flex align="center" gap={8}>
                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: "#10B981",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Rs. {budget.budgetAmount}
                      </Text>
                      <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={(e) => {
                          e.stopPropagation();
                          showDeleteModal(budget.id);
                        }}
                        loading={loading && budgetToDelete === budget.id}
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
        <p>Are you sure you want to delete this budget?</p>
      </Modal>
    </div>
  );
};

export default Budget;
