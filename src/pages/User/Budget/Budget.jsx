import React, { useState } from "react";
import { Typography, Button, Modal, Form, Input, Select, DatePicker, Flex, message } from "antd";
import { SmileOutlined, PlusOutlined } from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";

const { Title } = Typography;
const { Option } = Select;

const BudgetAdder = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("💰");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Groceries", "Rent", "Transportation", "Dining Out",
    "Utilities", "Entertainment", "Healthcare", "Education", "Other"
  ];

  const accountTypes = [
    "Cash", "Credit Card", "Debit Card", 
    "Bank Transfer", "Digital Wallet", "Other"
  ];

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setSelectedEmoji("💰");
  };

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    form.setFieldsValue({ icon: emojiData.emoji });
    setEmojiPickerVisible(false);
  };

  const handleAddBudget = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Replace with your actual API call
      console.log("Submitting budget:", {
        ...values,
        icon: selectedEmoji,
        date: values.date.format("YYYY-MM-DD")
      });

      message.success("Budget added successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error adding budget:", error);
      message.error("Failed to add budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Budget Overview</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          style={{ borderRadius: 6, backgroundColor: "#7288fa" }}
        >
          Add Budget
        </Button>
      </Flex>

      <Modal
        title="Add New Budget"
        open={isModalVisible}
        onOk={handleAddBudget}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Add Budget"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Icon" style={{ marginBottom: 16 }}>
            <Button
              icon={<SmileOutlined />}
              onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
              style={{
                background: "#F3E8FF",
                color: "#6C4AB6",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "1.2em",
              }}
            >
              {selectedEmoji}
            </Button>
            {emojiPickerVisible && (
              <div style={{ position: "absolute", zIndex: 10 }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </Form.Item>

          <Form.Item
            name="budgetName"
            label="Budget Name"
            rules={[{ required: true, message: "Please enter budget name" }]}
          >
            <Input placeholder="Enter budget name" />
          </Form.Item>

          <Form.Item
            name="budgetAmount"
            label="Budget Amount"
            rules={[{ required: true, message: "Please enter budget amount" }]}
          >
            <Input type="number" prefix="Rs." placeholder="Enter amount" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="accountType"
            label="Account Type"
            rules={[{ required: true, message: "Please select account type" }]}
          >
            <Select placeholder="Select account type">
              {accountTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BudgetAdder;