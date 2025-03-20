import React, { useEffect, useState } from "react";
import { Typography, Table, Button, Form, Input, InputNumber, Card,Select } from "antd";
import { useResponsive } from "antd-style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const Expense = () => {
  const { xxl } = useResponsive();

  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [form] = Form.useForm();

  // Fetch expenses and budgets from the server
  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    axios
      .post("http://localhost:4000/expenses", values)
      .then(() => {
        fetchExpenses(); // Refresh the expenses list
        form.resetFields(); // Clear the form
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Define table columns
  const columns = [
    {
      title: "Expense Name",
      dataIndex: "expenseName",
      key: "expenseName",
    },
    {
      title: "Expense Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: "Budget",
      dataIndex: "budgetId",
      key: "budgetId",
      render: (budgetId) => {
        const budget = budgets.find((b) => b.id === budgetId);
        return budget ? budget.budgetName : "N/A";
      },
    },
  ];

  const handleAddExpense = () => {
    navigate("/users/budget/addExpense");
  };

  return (
    <>
      <Title level={3}>Expenses</Title>
      <Card title="Add Expense" style={{ marginBottom: 20 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="expenseName"
            label="Expense Name"
            rules={[
              { required: true, message: "Please input the expense name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="expenseAmount"
            label="Expense Amount"
            rules={[
              { required: true, message: "Please input the expense amount!" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="budgetId"
            label="Budget"
            rules={[{ required: true, message: "Please select a budget!" }]}
          >
            <Select placeholder="Select a budget">
              {budgets.map((budget) => (
                <Select.Option key={budget.id} value={budget.id}>
                  {budget.budgetName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Display expenses list */}
      <Table dataSource={expenses} columns={columns} rowKey="id" />
    </>
  );
};

export default Expense;
