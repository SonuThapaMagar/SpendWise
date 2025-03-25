import React, { useState, useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/logo.png";
import { UserContext } from "../../context API/user.context";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { adminLogin } = useContext(UserContext);

  const onFinish = async (values) => {
    console.log("Form submitted with values:", values);

    const { username, password } = values;

    try {
      setLoading(true);
      const success = await adminLogin(username, password);

      if (success) {
        message.success("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        message.error("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
    message.error("Please fill in all required fields correctly");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 rounded-full" />
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#050C9C]">
          Admin Login
        </h2>
        <Form
          form={form}
          name="adminLogin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be at least 3 characters" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 4, message: "Password must be at least 4 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
