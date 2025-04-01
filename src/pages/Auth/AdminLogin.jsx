import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/logo.png";
import { useAdmin } from "../../context API/admin.context";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";
import axios from "axios"

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAdmin();

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Form submitted with values:", values);

    try {
      // This should be your actual admin login verification logic
      const response = await axios.get("http://localhost:4000/users");
      const adminUser = response.data.find(
        (user) =>
          user.username === values.username &&
          user.password === values.password &&
          user.isAdmin === true
      );

      if (adminUser) {
        localStorage.setItem("isAdminLoggedIn", "1");
        setIsAdminLoggedIn(true); // Update context state
        console.log("Admin session saved: isAdminLoggedIn = 1");
        showSuccessToast("Admin login successful!");
        navigate("/admin/dashboard"); // Navigate after state is updated
      } else {
        showErrorToast("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      showErrorToast("Login failed. Please try again.");
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
