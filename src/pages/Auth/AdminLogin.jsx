import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/logo.png";

const AdminLogin = ({ login }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      setLoading(true);

      // Static admin credentials (replace with your logic if needed)
      if (username === "admin" && password === "admin") {
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        login("admin"); // Set user role to admin
        message.success("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        message.error("Invalid admin credentials");
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 rounded-full" />
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#050C9C]">
          Admin Login
        </h2>
        <Form
          name="adminLogin"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;