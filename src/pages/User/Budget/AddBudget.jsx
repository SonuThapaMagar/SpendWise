import React from "react";
import { Card, Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddBudget = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post("http://localhost:4000/budgets", values)
      .then(function (response) {
        navigate("/users/budget");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card title="Add Budget" style={{ width: 300 }}>
      <Form
        {...layout}
        form={form}
        name="budget-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="budgetName"
          label="Budget Name"
          rules={[{ required: true, message: "Please input the budget name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="budgetAmount"
          label="Budget Amount"
          rules={[{ required: true, message: "Please input the budget amount!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBudget;