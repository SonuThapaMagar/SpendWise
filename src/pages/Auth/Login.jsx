import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import Logo from "/src/assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";
import { useUser } from "../../context API/user.context";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const success = await login(values.username, values.password);

      if (success) {
        showSuccessToast("Login successful!");
        navigate("/users/dashboard");
      } else {
        showErrorToast("Invalid username or password");
      }
    } catch (error) {
      showErrorToast("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-indigo-50 bg-loginBackground">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 relative z-10">
        <img src={Logo} alt="Logo" className="mx-auto w-18 h-18 mb-4" />
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Login
        </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-600 font-medium" />}
              placeholder="Username"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-600 font-md" />}
              placeholder="Password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <a href="" className="text-blue-500 hover:text-blue-700">
                Forgot password?
              </a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="w-full text-blue-500 px-6 py-3 rounded-lg hover:bg-indigo-400 transition duration-300 mb-4"
              style={{
                width: "100%",
                color: "white",
                padding: "1rem 1.5rem",
                borderRadius: "0.5rem",
                fontSize: "large",
                fontFamily: "Nunito, sans-serif",
              }}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center mt-4 text-medium text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={handleSignUpClick}
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                Sign Up now!
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
