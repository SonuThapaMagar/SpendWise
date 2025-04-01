import React, { useState, useEffect, useCallback } from "react";
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
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmojiPicker from "emoji-picker-react";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { useBudget } from "../../../context API/BudgetContext";
import { useCombinedFinance } from "../../../context API/CombinedFinanceContext";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify.util";

const { Title, Text } = Typography;
const { Option } = Select;

const Budget = React.memo(() => {
  const {
    budgets,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
    refreshBudgets,
  } = useBudget();
  const { refreshData } = useCombinedFinance();
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("💰");

  useEffect(() => {
    refreshBudgets();
  }, [refreshBudgets]);

  const categories = [
    "Groceries",
    "Rent",
    "Transportation",
    "Dining Out",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Clothing",
    "Travel & Vacations",
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

  const handleSubmit = useCallback(
    
    async (values) => {
      try {
        const budgetData = {
          budgetName: values.budgetName,
          budgetAmount: parseFloat(values.amount),
          date: values.date.format("YYYY-MM-DD"),
          category: values.category,
          accountType: values.accountType,
          icon: selectedEmoji,
        };

        if (modalType === "edit" && selectedBudget) {
          await updateBudget(selectedBudget.id, budgetData);
          showSuccessToast("Budget updated successfully!");
        } else {
          await addBudget(budgetData);
          showSuccessToast("Budget added successfully!");
        }
        closeModal();
        refreshBudgets();
        refreshData();
      } catch (error) {
        showErrorToast(
          `Failed to ${modalType === "edit" ? "update" : "add"} budget`
        );
      }
    },
    [addBudget, updateBudget, selectedBudget, modalType, selectedEmoji]
  );

  const handleDelete = useCallback(async () => {
    try {
      if (selectedBudget) {
        await deleteBudget(selectedBudget.id);
        showSuccessToast("Budget deleted successfully!");
        closeModal();
        refreshBudgets();
        refreshData();
      }
    } catch (error) {
      showErrorToast("Failed to delete budget");
    }
  }, [deleteBudget, selectedBudget]);

  const openModal = (type, budget = null) => {
    setModalType(type);
    setSelectedBudget(budget);

    if (type === "edit" && budget) {
      setSelectedEmoji(budget.icon || "💰");
      form.setFieldsValue({
        budgetName: budget.budgetName,
        amount: budget.budgetAmount.toString(),
        date: dayjs(budget.date),
        category: budget.category,
        accountType: budget.accountType,
      });
    } else if (type === "add") {
      setSelectedEmoji("💰");
      form.resetFields();
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedBudget(null);
    setIsEmojiPickerVisible(false);
    setSelectedEmoji("💰");
    form.resetFields();
  };

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsEmojiPickerVisible(false);
  };

  const chartData = budgets.map((budget) => ({
    name: budget.budgetName,
    amount: parseFloat(budget.budgetAmount) || 0,
  }));

  const maxAmount = Math.max(...chartData.map((data) => data.amount), 0);
  const yAxisMax = Math.ceil(maxAmount / 5000) * 5000;

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
    <div
      style={{
        padding: 24,
        "@media (maxWidth: 575px)": { padding: "16px" },
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 24,
          "@media (maxWidth: 575px)": {
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 16,
          },
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            "@media (maxWidth: 575px)": {
              fontSize: "20px",
              maxWidth: "50%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        >
          Budget Overview
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal("add")}
          size="large"
          style={{
            borderRadius: 6,
            backgroundColor: "#7288fa",
            "@media (maxWidth: 575px)": {
              padding: "4px 8px",
              fontSize: "14px",
              height: "auto",
            },
          }}
          loading={loading}
        >
          Add Budget
        </Button>
      </Flex>

      <Card
        style={{
          marginBottom: 24,
          "@media (maxWidth: 575px)": { marginBottom: 16 },
        }}
      >
        <Title
          level={4}
          style={{
            marginBottom: 16,
            "@media (maxWidth: 575px)": { fontSize: "16px", marginBottom: 12 },
          }}
        >
          Budget Distribution
        </Title>
        <div
          style={{
            height: 300,
            "@media (maxWidth: 575px)": { height: 200 },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
                // "@media (maxWidth: 575px)": {
                //   height: 50,
                //   tick: { fontSize: 10 },
                // }
              />
              <YAxis
                domain={[0, yAxisMax]}
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fontSize: 12 }}
                width={60}
                // "@media (maxWidth: 575px)": {
                //   tick: { fontSize: 10 },
                //   width: 50,
                // }
              />
              <Tooltip formatter={(value) => `Rs. ${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#7288fa" name="Budget Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <Flex
          justify="space-between"
          align="center"
          style={{
            marginBottom: 16,
            "@media (maxWidth: 575px)": {
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 12,
            },
          }}
        >
          <Title
            level={4}
            style={{
              "@media (maxWidth: 575px)": {
                fontSize: "16px",
                maxWidth: "50%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          >
            Recent Budgets
          </Title>
          <Button
            type="button"
            style={{
              borderColor: "gray",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)", // Fixed invalid shadow value
              "@media (maxWidth: 575px)": {
                padding: "4px 8px",
                fontSize: "14px",
                height: "auto",
              },
            }}
            icon={<DownloadOutlined />}
            size="large"
            onClick={exportToExcel}
            loading={loading}
          >
            Export to Excel
          </Button>
        </Flex>
        <Row
          gutter={[16, 16]}
          style={{
            "@media (maxWidth: 575px)": { gutter: [8, 8] },
          }}
        >
          {budgets.map((budget) => (
            <Col xs={24} sm={12} key={budget.id}>
              <Card
                style={{
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                  marginBottom: 8,
                  "@media (maxWidth: 575px)": { marginBottom: 4 },
                }}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  style={{
                    "@media (maxWidth: 575px)": { padding: "8px" },
                  }}
                >
                  <Flex
                    align="center"
                    gap={16}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      "@media (maxWidth: 575px)": { gap: 8 },
                    }}
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
                        "@media (maxWidth: 575px)": {
                          width: 32,
                          height: 32,
                          fontSize: 16,
                        },
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
                          "@media (maxWidth: 575px)": { fontSize: 14 },
                        }}
                      >
                        {budget.budgetName}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: 14,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          "@media (maxWidth: 575px)": { fontSize: 12 },
                        }}
                      >
                        {new Date(budget.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        | {budget.category}
                      </Text>
                    </div>
                  </Flex>
                  <Flex
                    align="center"
                    gap={8}
                    style={{
                      "@media (maxWidth: 575px)": { gap: 4 },
                    }}
                  >
                    <Text
                      strong
                      style={{
                        fontSize: 16,
                        color: "#10B981",
                        whiteSpace: "nowrap",
                        "@media (maxWidth: 575px)": { fontSize: 14 },
                      }}
                    >
                      Rs. {budget.budgetAmount}
                    </Text>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => openModal("edit", budget)}
                      style={{
                        "@media (maxWidth: 575px)": {
                          padding: 2,
                          fontSize: 14,
                        },
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => openModal("delete", budget)}
                      style={{
                        "@media (maxWidth: 575px)": {
                          padding: 2,
                          fontSize: 14,
                        },
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Add/Edit Budget Modal */}
      <Modal
        title={modalType === "add" ? "Add New Budget" : "Edit Budget"}
        open={modalType === "add" || modalType === "edit"}
        onOk={() => form.submit()}
        onCancel={closeModal}
        confirmLoading={loading}
        width="100%"
        style={{
          maxWidth: "50%",
          "@media (maxWidth: 575px)": {
            top: 20,
            padding: "0 8px",
            maxWidth: "90%",
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{
            "@media (maxWidth: 575px)": { padding: "12px" },
          }}
        >
          <div
            style={{
              marginBottom: "16px",
              "@media (maxWidth: 575px)": { marginBottom: "12px" },
            }}
          >
            <Button
              icon={<SmileOutlined />}
              onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
              style={{
                background: "#F3E8FF",
                color: "#6C4AB6",
                borderRadius: "8px",
                padding: "8px 12px",
                "@media (maxWidth: 575px)": {
                  padding: "6px 10px",
                  fontSize: "14px",
                },
              }}
            >
              {selectedEmoji}
            </Button>
            {isEmojiPickerVisible && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  "@media (maxWidth: 575px)": { width: "100%", maxWidth: 280 },
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <Form.Item
            name="budgetName"
            label="Budget Name"
            rules={[{ required: true, message: "Please input the budget name" }]}
          >
            <Input
              placeholder="Enter budget name"
              style={{
                "@media (maxWidth: 575px)": { fontSize: "14px", padding: "6px" },
              }}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount" }]}
          >
            <Input
              type="number"
              prefix="Rs."
              style={{
                "@media (maxWidth: 575px)": { fontSize: "14px", padding: "6px" },
              }}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{
                width: "100%",
                "@media (maxWidth: 575px)": { fontSize: "14px", padding: "6px" },
              }}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              style={{
                "@media (maxWidth: 575px)": { fontSize: "14px" },
              }}
            >
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
            <Select
              placeholder="Select an account type"
              style={{
                "@media (maxWidth: 575px)": { fontSize: "14px" },
              }}
            >
              {accountTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={modalType === "delete"}
        onOk={handleDelete}
        onCancel={closeModal}
        confirmLoading={loading}
        width="100%"
        style={{
          maxWidth: "100%",
          "@media (maxWidth: 575px)": {
            top: 20,
            padding: "0 8px",
            maxWidth: "90%",
          },
        }}
      >
        <p
          style={{
            "@media (maxWidth: 575px)": { fontSize: "14px", padding: "12px" },
          }}
        >
          Are you sure you want to delete this budget?
        </p>
      </Modal>
    </div>
  );
});

export default Budget;