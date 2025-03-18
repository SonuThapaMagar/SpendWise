import React, { useState, useEffect } from "react";
import { Card, Button, Form, Input, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const EditBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [budget, setBudget] = useState({
    budgetName: "",
    budgetAmount: 0,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/budgets/${id}`)
        .then(function (response) {
          setBudget(response.data);
          form.setFieldsValue({
            budgetName: response.data.budgetName,
            budgetAmount: response.data.budgetAmount,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id, form]);

  const onFinish = (values) => {
    axios
      .patch(`http://localhost:4000/budgets/${id}`, values)
      .then(function (response) {
        navigate("/users/budget");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card title="Edit Budget" style={{ width: 300 }}>
      <Form
        {...layout}
        form={form}
        name="budget-form"
        onFinish={onFinish}
        initialValues={budget}
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

export default EditBudget;