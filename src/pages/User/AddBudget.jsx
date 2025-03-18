import React from "react";
import { Card, Button, InputNumber, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const AddBudget = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    // Get existing budgets from localStorage
    const existingBudgets = JSON.parse(localStorage.getItem("budgets")) || [];

    // Add new budget
    const updatedBudgets = [...existingBudgets, values];

    // Save to localStorage
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

    message.success("Budget added successfully!");

    // Redirect to budget list page
    navigate("/users/budget");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Add Budget" style={{ width: 500 }}>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Budget Name"
          name="budgetName"
          rules={[{ required: true, message: "Please input your budget name!" }]}
        >
          <Input placeholder="Enter budget name" />
        </Form.Item>

        <Form.Item
          label="Budget Amount"
          name="budgetAmount"
          rules={[{ required: true, message: "Please input your budget amount!" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter amount" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBudget;
