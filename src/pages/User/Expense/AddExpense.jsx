import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Card, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const AddExpense = () => {
  const [form] = Form.useForm();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBudgets();

    if (id) {
      fetchExpense(id);
    }
  }, [id]);

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  const fetchExpense = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/expenses/${id}`)
      .then((response) => {
        form.setFieldsValue(response.data); // Pre-fill the form with the expense data
      })
      .catch((error) => {
        console.error("Error fetching expense:", error);
        message.error("Failed to fetch expense data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    setLoading(true);

    if (id) {
      // If editing, update the expense
      axios
        .patch(`http://localhost:4000/expenses/${id}`, values)
        .then(() => {
          message.success("Expense updated successfully!");
          navigate("/users/expense"); // Redirect to the expenses list
        })
        .catch((error) => {
          console.error("Error updating expense:", error);
          message.error("Failed to update expense.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // If adding, create a new expense
      axios
        .post("http://localhost:4000/expenses", values)
        .then(() => {
          message.success("Expense added successfully!");
          navigate("/users/expense"); // Redirect to the expenses list
        })
        .catch((error) => {
          console.error("Error adding expense:", error);
          message.error("Failed to add expense.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Card
      title={id ? "Edit Expense" : "Add Expense"}
      style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* Expense Name */}
        <Form.Item
          name="expenseName"
          label="Expense Name"
          rules={[{ required: true, message: "Please input the expense name!" }]}
        >
          <Input placeholder="Enter expense name" />
        </Form.Item>

        {/* Expense Amount */}
        <Form.Item
          name="expenseAmount"
          label="Expense Amount"
          rules={[{ required: true, message: "Please input the expense amount!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Enter expense amount"
          />
        </Form.Item>

        {/* Budget */}
        <Form.Item
          name="budgetId"
          label="Budget"
          rules={[{ required: true, message: "Please select a budget!" }]}
        >
          <Select placeholder="Select a budget">
            {budgets.map((budget) => (
              <Option key={budget.id} value={budget.id}>
                {budget.budgetName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? "Update Expense" : "Add Expense"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddExpense;