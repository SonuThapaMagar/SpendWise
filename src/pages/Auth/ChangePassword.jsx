import React, { useState } from "react";
import { Form, Input, Button, message,Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    // Validate that new password and confirm password match
    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match!");
      return;
    }

    // Validate that the current password is correct
    if (currentPassword !== user.password) {
      message.error("Current password is incorrect!");
      return;
    }

    setLoading(true);

    try {
      // Update the user's password in the backend
      const response = await axios.patch(`http://localhost:4000/users/${user.id}`, {
        password: newPassword,
      });

      // Update the user in the context
      setUser({ ...user, password: newPassword });

      // Show success message
      message.success("Password changed successfully!");

      // Redirect to the profile page
      navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Change Password"
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        name="change-password"
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your current password"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your new password"
          />
        </Form.Item>

        {/* Confirm New Password */}
        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm your new password"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", maxWidth: 200 }}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;