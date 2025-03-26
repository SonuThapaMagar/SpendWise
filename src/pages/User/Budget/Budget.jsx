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
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SmileOutlined,
  EditOutlined,
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
import dayjs from "dayjs";
import { useBudget } from "../../../context API/BudgetContext";

const { Title, Text } = Typography;
const { Option } = Select;

const Budget = React.memo(() => {
  const navigate = useNavigate();
  const { addBudget, editBudget, deleteBudget, budgets } = useBudget();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [addBudgetModalVisible, setAddBudgetModalVisible] = useState(false);
  const [editBudgetModalVisible, setEditBudgetModalVisible] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState(null);
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

  const handleAddBudget = async (values) => {
    try {
      setLoading(true);
      const budgetData = {
        budgetName: values.budgetName,
        budgetAmount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        category: values.category,
        accountType: values.accountType,
        icon: selectedEmoji,
      };
      await addBudget(budgetData);
      message.success("Budget added successfully!");
      return true;
    } catch (error) {
      message.error("Failed to add budget");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEditBudget = async (values) => {
    try {
      setLoading(true);
      const budgetData = {
        budgetName: values.budgetName,
        budgetAmount: values.amount,
        date: values.date.format("YYYY-MM-DD"),
        category: values.category,
        accountType: values.accountType,
        icon: selectedEmoji,
      };
      await editBudget(budgetToEdit.id, budgetData);
      message.success("Budget updated successfully!");
      return true;
    } catch (error) {
      message.error("Failed to update budget");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      setLoading(true);
      await deleteBudget(id);
      message.success("Budget deleted successfully!");
    } catch (error) {
      message.error("Failed to delete budget");
    } finally {
      setLoading(false);
    }
  };

  const modalHandlers = {
    delete: {
      show: (id) => {
        setBudgetToDelete(id);
        setDeleteModalVisible(true);
      },
      confirm: async () => {
        if (budgetToDelete) {
          await handleDeleteBudget(budgetToDelete);
          setDeleteModalVisible(false);
          setBudgetToDelete(null);
        }
      },
      cancel: () => {
        setDeleteModalVisible(false);
        setBudgetToDelete(null);
      },
    },
    add: {
      show: () => {
        setSelectedEmoji("💰");
        setAddBudgetModalVisible(true);
      },
      submit: async () => {
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
      },
      cancel: () => {
        form.resetFields();
        setAddBudgetModalVisible(false);
        setSelectedEmoji("💰");
      },
    },
    edit: {
      show: (budget) => {
        setBudgetToEdit(budget);
        setSelectedEmoji(budget.icon || "💰");
        form.setFieldsValue({
          budgetName: budget.budgetName,
          amount: budget.budgetAmount,
          date: dayjs(budget.date),
          category: budget.category,
          accountType: budget.accountType,
        });
        setEditBudgetModalVisible(true);
      },
      submit: async () => {
        try {
          const values = await form.validateFields();
          const success = await handleEditBudget(values);
          if (success) {
            form.resetFields();
            setEditBudgetModalVisible(false);
            setBudgetToEdit(null);
            setSelectedEmoji("💰");
          }
        } catch (error) {
          console.log("Form validation failed:", error);
        }
      },
      cancel: () => {
        form.resetFields();
        setEditBudgetModalVisible(false);
        setBudgetToEdit(null);
        setSelectedEmoji("💰");
      },
    },
  };

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    form.setFieldsValue({ icon: emojiData.emoji });
    setEmojiPickerVisible(false);
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
          onClick={modalHandlers.add.show}
          size="large"
          style={{ borderRadius: 6, backgroundColor: "#7288fa" }}
          loading={loading}
        >
          Add Budget
        </Button>
      </Flex>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Budget Distribution
        </Title>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="budgetName" />
              <YAxis />
              <Tooltip formatter={(value) => `Rs. ${value}`} />
              <Bar dataKey="budgetAmount" fill="#7288fa" name="Budget Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Modal
        title="Add New Budget"
        open={addBudgetModalVisible}
        onOk={modalHandlers.add.submit}
        onCancel={modalHandlers.add.cancel}
        confirmLoading={loading}
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
            rules={[{ required: true, message: "Please input the budget name" }]}
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
            rules={[{ required: true, message: "Please select an account type" }]}
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

      <Modal
        title="Edit Budget"
        open={editBudgetModalVisible}
        onOk={modalHandlers.edit.submit}
        onCancel={modalHandlers.edit.cancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" name="edit_budget_form">
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
            rules={[{ required: true, message: "Please input the budget name" }]}
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
            rules={[{ required: true, message: "Please select an account type" }]}
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

      <Card>
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
        <Row gutter={[16, 16]}>
          {budgets.map((budget) => (
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
                        {new Date(budget.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        | {budget.category}
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
                      icon={<EditOutlined />}
                      type="text"
                      onClick={() => modalHandlers.edit.show(budget)}
                      loading={loading && budgetToEdit?.id === budget.id}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      type="text"
                      danger
                      onClick={() => modalHandlers.delete.show(budget.id)}
                      loading={loading && budgetToDelete === budget.id}
                    />
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={modalHandlers.delete.confirm}
        onCancel={modalHandlers.delete.cancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this budget?</p>
      </Modal>
    </div>
  );
});

export default Budget;