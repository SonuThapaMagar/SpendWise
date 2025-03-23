import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Typography,
  Row,
  Col,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const EditBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [budget, setBudget] = useState({
    budgetName: "",
    budgetAmount: 0,
    date: dayjs(),
    category: "",
    accountType: "cash",
    note: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/budgets/${id}`)
        .then(function (response) {
          const data = response.data;
          setBudget({
            ...data,
            date: data.date ? dayjs(data.date) : dayjs(), // Convert date string to dayjs object
          });
          form.setFieldsValue({
            budgetName: data.budgetName,
            budgetAmount: data.budgetAmount,
            date: data.date ? dayjs(data.date) : dayjs(),
            category: data.category,
            accountType: data.accountType,
            note: data.note,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id, form]);

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };

    axios
      .patch(`http://localhost:4000/budgets/${id}`, formattedValues)
      .then(function (response) {
        navigate("/users/budget");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card
      title={<Title level={4}>Edit Budget</Title>}
      style={{ maxWidth: 800, margin: "0 auto", padding: "16px" }}
    >
      <Form
        {...layout}
        form={form}
        name="budget-form"
        onFinish={onFinish}
        initialValues={budget}
      >
        {/* Budget Name and Budget Amount in a single row */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="budgetName"
              label="Budget Name"
              rules={[
                { required: true, message: "Please input the budget name!" },
              ]}
            >
              <Input placeholder="Enter budget name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="budgetAmount"
              label="Budget Amount"
              rules={[
                { required: true, message: "Please input the budget amount!" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter budget amount"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Date and Category in a single row */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                { required: true, message: "Please select a category!" },
              ]}
            >
              <Select placeholder="Select category">
                <Option value="food">Food</Option>
                <Option value="transport">Transport</Option>
                <Option value="entertainment">Entertainment</Option>
                <Option value="utilities">Utilities</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Account Type and Note/Remark in a single row */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="accountType"
              label="Account Type"
              rules={[
                { required: true, message: "Please select an account type!" },
              ]}
            >
              <Select placeholder="Select account type">
                <Option value="cash">Cash</Option>
                <Option value="account">Bank Account</Option>
                <Option value="card">Credit/Debit Card</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="note" label="Note/Remark">
              <TextArea
                rows={4}
                placeholder="Enter any additional notes or remarks"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditBudget;