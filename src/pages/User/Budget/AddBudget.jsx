import React from "react";
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
import { useNavigate } from "react-router-dom";
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

const AddBudget = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };

    axios
      .post("http://localhost:4000/budgets", formattedValues)
      .then(function (response) {
        navigate("/users/budget");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card
      title={<Title level={4}>Add Budget</Title>}
      style={{ maxWidth: 800, margin: "0 auto", padding: "16px" }}
    >
      <Form
        {...layout}
        form={form}
        name="budget-form"
        onFinish={onFinish}
        initialValues={{
          date: dayjs(), // Default to today's date
          accountType: "cash", // Default account type
        }}
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

export default AddBudget;